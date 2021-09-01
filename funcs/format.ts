/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 22:22:23
 * @LastEditTime: 2021-08-31 21:19:34
 * @Description: file content
 */
import { omit } from "lodash-es"

export default <T extends object, P extends readonly (keyof T)[], Formatted extends object>(
  object: T,
  patten: P,
  formatFn: (object: T) => Formatted
) => {
  type OmitKeys = typeof patten[number]
  const omittedObject = omit(object, patten) as Omit<T, OmitKeys>
  return Object.assign(omittedObject, formatFn(object))
}

