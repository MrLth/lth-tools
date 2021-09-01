"use strict";

import "core-js/modules/es.regexp.constructor.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.object.to-string.js";
Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-06-25 08:00:22
 * @LastEditTime: 2021-06-25 08:03:09
 * @Description: file content
 */

exports.default = function (num, i) {
  if (i === void 0) {
    i = 3;
  }

  var reg = new RegExp("(\\d)(?=(?:\\d{" + i + "})+$)", 'g');
  return num.toString().replace(reg, '$1,');
};