"use strict";

import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 17:00:14
 * @LastEditTime: 2021-08-17 17:02:14
 * @Description: file content
 */

exports.default = function (duration) {
  return duration > 0 ? new Promise(function (resolve) {
    return setTimeout(resolve, duration);
  }) : undefined;
};