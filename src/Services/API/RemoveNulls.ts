const removeNulls = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(removeNulls) as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj as Record<string, unknown>)
      .filter(([, value]) => value !== null)
      .reduce((acc, [k, v]) => {
        (acc as Record<string, unknown>)[k] = removeNulls(v);
        return acc;
      }, {} as Record<string, unknown>) as T;
  }
  return obj;
};

export default removeNulls;