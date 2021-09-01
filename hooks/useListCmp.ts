/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-24 14:29:03
 * @LastEditTime: 2021-08-24 14:35:35
 * @Description: file content
 */
import { useMemo } from "react"

export default <T extends any[]>(list: T) => {
  return useMemo(() => list.slice() as T, [list])
}