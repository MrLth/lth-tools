declare const _default: <T extends object, P extends readonly (keyof T)[], Formatted extends object>(object: T, patten: P, formatFn: (object: T) => Formatted) => Omit<T, P[number]> & Formatted;
export default _default;
