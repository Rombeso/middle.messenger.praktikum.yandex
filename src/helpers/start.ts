import { Dispatch } from 'store/store';

export function start(dispatch: Dispatch<AppState>) {
  dispatch({ isAppStarted: true });
}
