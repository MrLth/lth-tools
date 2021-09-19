"use strict";
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:56:23
 * @LastEditTime: 2021-09-19 17:25:07
 * @Description: file content
 */

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = require("react");

var react_dom_1 = require("react-dom");

var useLayoutStyles_1 = require("../hooks/useLayoutStyles");

var ZStack_m_css_1 = require("../css/ZStack.m.css");

exports.default = function (props) {
  var children = props.children,
      _props$center = props.center,
      center = _props$center === void 0 ? false : _props$center,
      className = props.className;
  var style = (0, useLayoutStyles_1.default)(props, {});
  var dom = (0, react_1.useMemo)(function () {
    var temp = document.createElement('div');
    temp.classList.add(ZStack_m_css_1.default.default);
    document.body.appendChild(temp);
    return temp;
  }, []);
  (0, react_1.useLayoutEffect)(function () {
    Object.assign(dom.style, style);
  }, [dom, style]);
  (0, react_1.useLayoutEffect)(function () {
    if (center) {
      dom.classList.add(ZStack_m_css_1.default.center);
    } else {
      dom.classList.remove(ZStack_m_css_1.default.center);
    }
  }, [dom, center]);
  (0, react_1.useLayoutEffect)(function () {
    if (className) {
      var _dom$classList;

      (_dom$classList = dom.classList).add.apply(_dom$classList, className.split(' '));
    }
  }, [dom, className]);
  (0, react_1.useEffect)(function () {
    return function () {
      document.body.removeChild(dom);
    };
  }, [dom]);
  return (0, react_dom_1.createPortal)(react_1.default.createElement(react_1.default.Fragment, null, children), dom);
};