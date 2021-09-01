"use strict";

import "core-js/modules/es.array.slice.js";
Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-24 14:29:03
 * @LastEditTime: 2021-08-24 14:35:35
 * @Description: file content
 */

var react_1 = require("react");

exports.default = function (list) {
  return (0, react_1.useMemo)(function () {
    return list.slice();
  }, [list]);
};