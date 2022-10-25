import { isStringEqual } from 'helpers/isStringEqual';
import { BlockConstructable } from './RegisterComponent';

export interface RouteProps {
  pathname: string;
  view: BlockConstructable;
  isSecret: boolean;
  callback: Function;
}

export default class Route {
  private _pathname: string;

  private _blockClass: BlockConstructable;

  private _isSecret: boolean;

  callback: Function;

  constructor({ pathname, view, isSecret, callback }: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._isSecret = isSecret;
    this.callback = callback;
  }

  match(pathname: string): boolean {
    return isStringEqual(pathname, this._pathname);
  }
}
