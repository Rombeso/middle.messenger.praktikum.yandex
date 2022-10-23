function isDeepMerge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const n in rhs) {
    if (!rhs.hasOwnProperty(n)) {
      continue;
    }
    if (typeof lhs[n] != 'object') {
      lhs[n] = rhs[n];
    } else if (typeof rhs[n] == 'object') {
      lhs[n] = isDeepMerge(lhs[n] as Indexed, rhs[n] as Indexed);
    }
  }
  return lhs;
}

export default isDeepMerge;
