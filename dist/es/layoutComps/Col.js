/* eslint-disable react/no-unused-prop-types */

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 10:39:23
 * @LastEditTime: 2021-08-17 15:08:41
 * @Description: file content
 */
import React from 'react';
import useLayoutStyles from '../hooks/useLayoutStyles';
var componentStyle = {
  display: 'flex',
  flexDirection: 'column'
};
export default (function (props) {
  var children = props.children,
      className = props.className;
  var style = useLayoutStyles(props, componentStyle);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: style
  }, children);
});