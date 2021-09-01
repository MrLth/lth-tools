/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-29 18:50:11
 * @LastEditTime: 2021-08-31 22:14:36
 * @Description: file content
 */

export default <T extends (...args: unknown[]) => unknown>(fn: T) => {
  let timerID:NodeJS.Timeout
  return {
    delay(time: number, ...args: Parameters<T>) {
      clearTimeout(timerID)
      timerID = setTimeout(fn.bind(null, args), time)
    },
    trigger(...args: Parameters<T>) {
      clearTimeout(timerID)
      fn.call(null, args)
    }
  }
}