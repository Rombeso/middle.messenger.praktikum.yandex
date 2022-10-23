import { isPlainObject } from './isArrayOrObject';
import getObjFromPath from './getObjFromPath';
import isDeepMerge from './isDeepMerge';

function setValue(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be a string');
  }

  if (!isPlainObject(object)) return object;

  const rhs = getObjFromPath(path.split('.'), value);

  return isDeepMerge(object as Indexed, rhs);
}

export default setValue;
