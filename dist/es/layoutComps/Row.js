/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:50:36
 * @LastEditTime: 2021-08-17 15:08:54
 * @Description: file content
 */
import React from 'react';
import useLayoutStyles from '../hooks/useLayoutStyles';
var componentStyle = {
  display: 'flex',
  flexDirection: 'row'
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