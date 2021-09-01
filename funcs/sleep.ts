/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 17:00:14
 * @LastEditTime: 2021-08-17 17:02:14
 * @Description: file content
 */
export default (duration: number) => (duration > 0
  ? new Promise((resolve) => setTimeout(resolve, duration))
  : undefined)
