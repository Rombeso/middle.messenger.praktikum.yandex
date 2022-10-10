require('babel-core/register');

import { renderDOM, registerComponent } from './core';
import './styles/style.scss';
import Button from 'components/Button/Button';
import Link from 'components/Link/Link';
import Input from 'components/Input/Input';
// import ChatItem from 'components/ChatItem/ChatItem';
// import SearchBar from 'components/SearchBar/SearchBar';
import User from 'components/User/User';
import profileItem from 'components/ProfileItem/ProfileItem';
import inputData from 'components/InputData/InputData';
// import Popup from 'components/Popup/Popup';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import Label from 'components/Label/Label';
import ErrorMessage from 'components/Error/Error';
import ReturnButton from 'components/ReturnButton/ReturnButton';
// import ChatMessage from 'components/ChatMessage/ChatMessage';
// import MessageInput from 'components/MessageInput/MessageInput';
// import Avatar from 'components/Avatar/Avatar';
import { regInputs } from 'data/regInputs';
// import { chats } from './data/chats';
import { profileData } from 'data/profileData';
import FirstPage from 'pages/first/first';
import SignupPage from 'pages/signUp/singUp';
import LoginPage from 'pages/login/login';
// import MainPage from 'pages/main/main';
import Profile from 'pages/profile/profile';
//import changeProfile from 'pages/changeProfile/changeProfile';
// import ChangeUserPassword from 'pages/changeUserPassword/changeUserPassword';
// import ChangeUserAvatar from 'pages/changeUserAvatar/changeUserAvatar';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
// registerComponent(ChatItem);
// registerComponent(SearchBar);
registerComponent(User);
registerComponent(profileItem);
registerComponent(inputData);
// registerComponent(Popup);
registerComponent(ControlledInput);
registerComponent(Label);
registerComponent(ErrorMessage);
registerComponent(ReturnButton);
// registerComponent(ChatMessage);
// registerComponent(MessageInput);
// registerComponent(Avatar);
type PagesMap = { [key: string]: any };

const currentLocation: string = window.location.pathname;

const pagesMap: PagesMap = {
  '/': [FirstPage, null],
  '/login': [LoginPage, null],
  '/signUp': [SignupPage, { regInputs }],
  // '/main': [MainPage, { chats }],
  '/profile': [Profile, { profile: profileData }],
  // '/changeProfile': [changeProfile, { profileData }],
  // '/changeUserPassword': [ChangeUserPassword, null],
  // '/changeUserAvatar': [ChangeUserAvatar, null],
};

const [pageToRender, props] = pagesMap[currentLocation];

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new pageToRender(props));
});
