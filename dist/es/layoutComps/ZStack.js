import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:56:23
 * @LastEditTime: 2021-09-19 17:25:07
 * @Description: file content
 */
import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import useLayoutStyles from '../hooks/useLayoutStyles';
import c from '../css/ZStack.m.css';
export default (function (props) {
  var children = props.children,
      _props$center = props.center,
      center = _props$center === void 0 ? false : _props$center,
      className = props.className;
  var style = useLayoutStyles(props, {});
  var dom = useMemo(function () {
    var temp = document.createElement('div');
    temp.classList.add(c.default);
    document.body.appendChild(temp);
    return temp;
  }, []);
  useLayoutEffect(function () {
    Object.assign(dom.style, style);
  }, [dom, style]);
  useLayoutEffect(function () {
    if (center) {
      dom.classList.add(c.center);
    } else {
      dom.classList.remove(c.center);
    }
  }, [dom, center]);
  useLayoutEffect(function () {
    if (className) {
      var _dom$classList;

      (_dom$classList = dom.classList).add.apply(_dom$classList, className.split(' '));
    }
  }, [dom, className]);
  useEffect(function () {
    return function () {
      document.body.removeChild(dom);
    };
  }, [dom]);
  return /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement(React.Fragment, null, children), dom);
});