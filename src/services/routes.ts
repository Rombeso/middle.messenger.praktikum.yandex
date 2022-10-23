import { RouteProps } from 'core/Route';
import LoginPage from 'pages/login/login';
import SingUpPage from 'pages/signUp/singUp';
import FirstPage from 'pages/first/first';
import ChatsPage from 'pages/chats/chats';
import Profile from 'pages/profile/profile';
import ChangeProfile from 'pages/changeProfile/changeProfile';
import ChangePassword from 'pages/changePassword/changePassword';
import ChangeAvatar from 'pages/changeAvatar/changeAvatar';

export const ROUTS: Array<RouteProps> = [
  {
    pathname: '/',
    view: FirstPage,
    isSecret: false,
  },
  {
    pathname: '/login',
    view: LoginPage,
    isSecret: false,
  },
  {
    pathname: '/signUp',
    view: SingUpPage,
    isSecret: false,
  },
  {
    pathname: '/chats',
    view: ChatsPage,
    isSecret: true,
  },
  {
    pathname: '/profile',
    view: Profile,
    isSecret: true,
  },
  {
    pathname: '/changeProfile',
    view: ChangeProfile,
    isSecret: true,
  },
  {
    pathname: '/changePassword',
    view: ChangePassword,
    isSecret: true,
  },
  {
    pathname: '/changeAvatar',
    view: ChangeAvatar,
    isSecret: true,
  },
];
