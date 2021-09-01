import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 17:00:14
 * @LastEditTime: 2021-08-17 17:02:14
 * @Description: file content
 */
export default (function (duration) {
  return duration > 0 ? new Promise(function (resolve) {
    return setTimeout(resolve, duration);
  }) : undefined;
});