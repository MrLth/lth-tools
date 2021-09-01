"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-06-15 11:53:36
 * @LastEditTime: 2021-06-15 11:58:17
 * @Description: file content
 */

var react_1 = require("react");

exports.default = function (value) {
  var ref = (0, react_1.useRef)(value);
  ref.current = value;
  return ref;
};