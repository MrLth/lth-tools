"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:51:53
 * @LastEditTime: 2021-08-17 15:08:30
 * @Description: file content
 */

var react_1 = require("react");

var useLayoutStyles_1 = require("../hooks/useLayoutStyles");

var componentStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  justifyContent: 'center'
};

exports.default = function (props) {
  var children = props.children,
      className = props.className;
  var style = (0, useLayoutStyles_1.default)(props, componentStyle);
  return react_1.default.createElement("div", {
    className: className,
    style: style
  }, children);
};