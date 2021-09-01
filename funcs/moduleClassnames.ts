/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-31 21:55:58
 * @LastEditTime: 2021-08-31 21:56:03
 * @Description: file content
 */
import { isString } from "lodash-es";

export default <T extends Record<string, string>>(module: T) => (
  ...paras: (keyof T | Partial<{ [P in keyof T]: boolean }>)[]
): string => {
  const classList = new Set<string>();

  for (const para of paras) {
    if (isString(para)) {
      classList.add(module[para]);
    } else {
      for (const [k, v] of Object.entries(para)) {
        if (v) classList.add(module[k])
      }
    }
  }

  return [...classList].join(' ');
}
