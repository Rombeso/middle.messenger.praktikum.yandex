import { isStringEqual } from 'helpers/isStringEqual';
import Block from './Block';
import { AnyProps, BlockConstructable } from './RegisterComponent';
import renderDOM from './RenderDOM';

export interface RouteProps {
  pathname: string;
  view: BlockConstructable;
  isSecret: boolean;
  // viewProps: AnyProps;
  // props: { rootQuery: string };
}

export default class Route {
  private _pathname: string;

  private _blockClass: BlockConstructable;

  // private _props: { rootQuery: string };

  private _block: Nullable<Block<AnyProps>>;

  private _isSecret: boolean;

  // _viewProps: AnyProps;

  constructor({ pathname, view, isSecret }: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._isSecret = isSecret;

    // this._props = props;
    // this._viewProps = viewProps;
  }

  navigate(pathname: string, viewProps: AnyProps) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render(viewProps);
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isStringEqual(pathname, this._pathname);
  }

  render(viewProps: AnyProps) {
    if (!this._block) {
      this._block = new this._blockClass(viewProps);
      renderDOM(this._block);
      // renderBlock(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
