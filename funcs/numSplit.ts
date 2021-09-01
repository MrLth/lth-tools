/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-06-25 08:00:22
 * @LastEditTime: 2021-06-25 08:03:09
 * @Description: file content
 */
export default (num: number, i = 3) => {
  const reg = new RegExp(`(\\d)(?=(?:\\d{${i}})+$)`, 'g')
  return num.toString().replace(reg, '$1,')
}