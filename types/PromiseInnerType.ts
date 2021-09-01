/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-31 09:31:47
 * @LastEditTime: 2021-08-31 22:23:35
 * @Description: file content
 */
export type PromiseInnerType<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never