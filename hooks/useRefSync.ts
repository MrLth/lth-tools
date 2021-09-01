/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-06-15 11:53:36
 * @LastEditTime: 2021-06-15 11:58:17
 * @Description: file content
 */
import { useRef } from "react"

export default <T>(value: T) => {
  const ref = useRef<T>(value)
  ref.current = value
  return ref
}