import { PATH } from 'data/pathsApi';

import queryStringify from 'helpers/queryStringify';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  timeout?: number;
  data?: Record<string, any>;
  headers?: Record<string, string>;
};

export default class HTTPTransport {
  get = (url: string, queryParams?: Record<string, string>) => {
    const urlWithParams = queryParams ? url + queryStringify(queryParams) : url;

    return this.request(PATH.BASE + urlWithParams, METHODS.GET);
  };

  post = (url: string, options?: Options) => {
    return this.request(PATH.BASE + url, METHODS.POST, options?.data);
  };

  put = (url: string, options: Options) => {
    return this.request(PATH.BASE + url, METHODS.PUT, options.data);
  };

  delete = (url: string) => {
    return this.request(PATH.BASE + url, METHODS.DELETE);
  };

  request = <T extends any>(
    url: string,
    method: METHODS,
    data?: Record<string, string>,
    timeout = 5000
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.responseType = 'json';
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
