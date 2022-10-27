import HTTPTransport from 'core/HttpTransport';
import { LoginRequestData, ResponseData, SignupRequestData } from './typeApi';

type LoginRequestData = {
  login: string;
  password: string;
};

export class AuthAPI extends HTTPTransport {
  constructor() {
    super();
  }

  login = async (data: LoginRequestData): Promise<ResponseData> =>
    this.post('auth/signin', { data }) as Promise<ResponseData>;

  getUserInfo = async () => this.get('auth/user');

  signout = () => this.post('auth/logout');

  signup = async (data: SignupRequestData): Promise<ResponseData> =>
    this.post('auth/signup', { data }) as Promise<ResponseData>;
}
