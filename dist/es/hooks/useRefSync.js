/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-06-15 11:53:36
 * @LastEditTime: 2021-06-15 11:58:17
 * @Description: file content
 */
import { useRef } from "react";
export default (function (value) {
  var ref = useRef(value);
  ref.current = value;
  return ref;
});