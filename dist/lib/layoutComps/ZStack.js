"use strict";
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:56:23
 * @LastEditTime: 2021-08-17 15:09:05
 * @Description: file content
 */

import "core-js/modules/es.object.assign.js";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = require("react");

var react_dom_1 = require("react-dom");

var useLayoutStyles_1 = require("../hooks/useLayoutStyles");

var componentStyle = {
  display: 'flex',
  flexDirection: 'row'
};
var defaultContainerStyle = {
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  pointerEvents: 'none'
};
var centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

exports.default = function (props) {
  var children = props.children,
      containerStyle = props.containerStyle,
      _props$center = props.center,
      center = _props$center === void 0 ? false : _props$center,
      className = props.className;
  var style = (0, useLayoutStyles_1.default)(props, componentStyle);
  var dom = (0, react_1.useMemo)(function () {
    var temp = document.createElement('div');
    temp.classList.add('popup');
    document.body.appendChild(temp);
    return temp;
  }, []);
  (0, react_1.useLayoutEffect)(function () {
    Object.assign(dom.style, defaultContainerStyle, center ? centerStyles : null, containerStyle);
  }, [dom, containerStyle, center]);
  (0, react_1.useEffect)(function () {
    return function () {
      document.body.removeChild(dom);
    };
  }, [dom]);
  return (0, react_dom_1.createPortal)(react_1.default.createElement("div", {
    className: className,
    style: style
  }, children), dom);
};