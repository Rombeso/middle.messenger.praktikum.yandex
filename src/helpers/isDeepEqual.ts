import { isArrayOrObject } from './isArrayOrObject';

function isDeepEqual(lhs: Indexed, rhs: Indexed): boolean {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isDeepEqual(value as Indexed, rightValue as Indexed)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default isDeepEqual;
