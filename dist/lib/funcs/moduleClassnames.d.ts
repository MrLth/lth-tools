declare const _default: <T extends Record<string, string>>(module: T) => (...paras: (keyof T | Partial<{ [P in keyof T]: boolean; }>)[]) => string;
export default _default;
