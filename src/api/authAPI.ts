import HTTPTransport from 'core/HttpTransport';
import { APIError } from './typeApi';

type LoginRequestData = {
  login: string;
  password: string;
};

type LoginResponseData = {} | APIError;

export class AuthAPI extends HTTPTransport {
  signin = (data: LoginRequestData): LoginResponseData => this.post('auth/signin', { data });

  getUserInfo = () => this.get('auth/user');

  signout = () => this.post('auth/logout');
}