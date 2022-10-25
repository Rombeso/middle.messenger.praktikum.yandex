require('babel-core/register');

import { renderDOM, registerComponent } from './core';
import 'styles/style.scss';
import Button from 'components/Button/Button';
import Link from 'components/Link/Link';
import Input from 'components/Input/Input';
import ChatItem from 'components/ChatItem/ChatItem';
import InputSearch from 'components/InputSearch/InputSearch';
import User from 'components/User/User';
import profileItem from 'components/ProfileItem/ProfileItem';
import inputData from 'components/InputData/InputData';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import Label from 'components/Label/Label';
import ErrorMessage from 'components/Error/Error';
import ReturnButton from 'components/ReturnButton/ReturnButton';
import ChatMessage from 'components/ChatMassage/ChatMassage';
import InputMessage from 'components/InputMassage/InputMassage';
import Avatar from 'components/Avatar/Avatar';
// import { regInputs } from 'data/regInputs';
// import { chat } from './data/chat';
// import { profileData } from 'data/profileData';
import FirstPage from 'pages/first/first';
// import SignupPage from 'pages/signUp/singUp';
// import LoginPage from 'pages/login/login';
// import ChatsPage from 'pages/chats/chats';
// import Profile from 'pages/profile/profile';
// import ChangeProfile from 'pages/changeProfile/changeProfile';
// import ChangePassword from 'pages/changePassword/changePassword';
// import Error404Page from 'pages/errors/404';
// import Error500Page from 'pages/errors/500';
// import ChangeAvatar from 'pages/changeAvatar/changeAvatar';
import Router from 'core/Router';
import { initRouter } from 'services/initRouter';
import store, { Store } from './store/store';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(ChatItem);
registerComponent(InputSearch);
registerComponent(User);
registerComponent(profileItem);
registerComponent(inputData);
registerComponent(ControlledInput);
registerComponent(Label);
registerComponent(ErrorMessage);
registerComponent(ReturnButton);
registerComponent(ChatMessage);
registerComponent(InputMessage);
registerComponent(Avatar);

declare global {
  interface Window {
    router: Router;
    store: Store<AppState>;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();
  window.router = router;
  window.store = store;

  renderDOM(new FirstPage({ router }));

  store.on('updated', (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log('%cstore updated', 'background: #222; color: #bada55', nextState);
    }
  });

  initRouter(router, store);
});
