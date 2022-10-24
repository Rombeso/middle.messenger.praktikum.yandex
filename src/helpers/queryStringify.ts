import { isArrayOrObject, isPlainObject } from './isArrayOrObject';

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: Indexed | [], parentKey?: string) {
  const result: [string, string][] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  });
  return result;
}

function queryStringify(data: Indexed): string | never {
  if (!isPlainObject(data)) {
    throw Error('input must be an object');
  }
  const result = getParams(data)
    .map(arr => arr.join('='))
    .join('&');
  return result;
}

export default queryStringify;
