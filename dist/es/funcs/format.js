import "core-js/modules/es.object.assign.js";

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 22:22:23
 * @LastEditTime: 2021-08-31 21:19:34
 * @Description: file content
 */
import { omit } from "lodash-es";
export default (function (object, patten, formatFn) {
  var omittedObject = omit(object, patten);
  return Object.assign(omittedObject, formatFn(object));
});