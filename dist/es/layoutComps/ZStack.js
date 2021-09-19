import "core-js/modules/es.object.assign.js";

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:56:23
 * @LastEditTime: 2021-09-19 16:51:47
 * @Description: file content
 */
import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import useLayoutStyles from '../hooks/useLayoutStyles';
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
export default (function (props) {
  var children = props.children,
      _props$center = props.center,
      center = _props$center === void 0 ? false : _props$center,
      className = props.className;
  var style = useLayoutStyles(props, componentStyle);
  var dom = useMemo(function () {
    var temp = document.createElement('div');
    document.body.appendChild(temp);
    return temp;
  }, []);
  useLayoutEffect(function () {
    Object.assign(dom.style, defaultContainerStyle, center ? centerStyles : null, style);
  }, [dom, style, center]);
  useLayoutEffect(function () {
    if (className) {
      dom.className = className;
    }
  }, [dom, className]);
  useEffect(function () {
    return function () {
      document.body.removeChild(dom);
    };
  }, [dom]);
  return /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement(React.Fragment, null, children), dom);
});