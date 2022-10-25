import { ROUTS } from 'services/routes';
import renderDOM from 'core/RenderDOM';
import Router from 'core/Router';
import FirstPage from 'pages/first/first';
import { Store } from 'store/store';

export const initRouter = (router: Router, store: Store<AppState>) => {
  ROUTS.forEach(route => {
    router.use(route, () => {
      if (!store.getState().view) {
        store.dispatch({ view: FirstPage });
      }

      store.dispatch({ view: route.view });
    });
  });

  router.start();

  store.on('updated', (prevState, nextState) => {
    if (prevState.view !== nextState.view) {
      const Page = nextState.view;

      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
};
