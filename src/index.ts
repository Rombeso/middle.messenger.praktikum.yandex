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
import { regInputs } from 'data/regInputs';
import { chat } from './data/chat';
import { profileData } from 'data/profileData';
import FirstPage from 'pages/first/first';
import SignupPage from 'pages/signUp/singUp';
import LoginPage from 'pages/login/login';
import ChatsPage from 'pages/chats/chats';
import Profile from 'pages/profile/profile';
import ChangeProfile from 'pages/changeProfile/changeProfile';
import ChangePassword from 'pages/changePassword/changePassword';
import Error404Page from 'pages/errors/404';
import Error500Page from 'pages/errors/500';

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

type PagesMap = { [key: string]: any };

const currentLocation: string = window.location.pathname;

const pagesMap: PagesMap = {
  '/': [FirstPage, null],
  '/login': [LoginPage, null],
  '/signUp': [SignupPage, { regInputs }],
  '/chats': [ChatsPage, { chat }],
  '/profile': [Profile, { profileData }],
  '/changeProfile': [ChangeProfile, { profileData }],
  '/changePassword': [ChangePassword, null],
  '/404': [Error404Page, null],
  '/500': [Error500Page, null],
};

const [pageToRender, props] = pagesMap[currentLocation];

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new pageToRender(props));
});
