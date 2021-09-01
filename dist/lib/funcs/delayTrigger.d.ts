declare const _default: <T extends (...args: unknown[]) => unknown>(fn: T) => {
    delay(time: number, ...args: Parameters<T>): void;
    trigger(...args: Parameters<T>): void;
};
export default _default;
