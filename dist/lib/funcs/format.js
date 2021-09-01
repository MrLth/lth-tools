"use strict";

import "core-js/modules/es.object.assign.js";
Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-30 22:22:23
 * @LastEditTime: 2021-08-31 21:19:34
 * @Description: file content
 */

var lodash_es_1 = require("lodash-es");

exports.default = function (object, patten, formatFn) {
  var omittedObject = (0, lodash_es_1.omit)(object, patten);
  return Object.assign(omittedObject, formatFn(object));
};