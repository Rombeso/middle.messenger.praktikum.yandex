import { BlockClass } from 'core/Block';
import { Store } from 'store/store';

type WithStateProps = { store: Store<AppState> };

export function WithStore<P extends WithStateProps>(Block: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends Block<P> {
    public static componentName = Block.componentName || Block.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = () => {
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('updated', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('updated', this.__onChangeStoreCallback);
    }
  } as BlockClass<Omit<P, 'store'>>;
}
