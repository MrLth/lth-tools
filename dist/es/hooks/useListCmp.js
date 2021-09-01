import "core-js/modules/es.array.slice.js";

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-24 14:29:03
 * @LastEditTime: 2021-08-24 14:35:35
 * @Description: file content
 */
import { useMemo } from "react";
export default (function (list) {
  return useMemo(function () {
    return list.slice();
  }, [list]);
});