import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

type Events = Values<typeof Block.EVENTS>;

export default class Block<
  P extends Record<string, any>,
  Refs extends Record<string, Block<any>> = {}
> {
  static componentName: string;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:components-did-mount',
    FLOW_CDU: 'flow:components-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;

  protected readonly props: P;

  protected children: { [id: string]: Block<{}> } = {};

  _eventBus: EventBus<Events>;

  // @ts-expect-error Тип {} не соответствует типу Record<string, Block<any>
  protected refs: Refs = {} as { [key: string]: Block };

  public constructor(props?: P) {
    this.props = this._makePropsProxy(props || ({} as P));

    this._eventBus = new EventBus<Events>();

    this._registerEvents(this._eventBus);

    this._eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {
    this.setProps(props);
    return true;
  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props as Object, nextProps);
  };

  getProps = () => {
    return this.props;
  };

  getRefs() {
    return this.refs;
  }

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();
    const newElement = fragment.firstElementChild!;

    if (this._element) {
      this._removeEvents();
      this._element!.replaceWith(newElement);
    }

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this._eventBus.emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _makePropsProxy(props: any): any {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());

    fragment.innerHTML = template({
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /**
       * Заменяем заглушку на components._element
       */
      const content = component.getContent();
      stub.replaceWith(content);

      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const layoutContent = content.querySelector('[data-layout="1"]');

      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
