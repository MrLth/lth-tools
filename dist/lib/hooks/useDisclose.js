"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-06-14 23:45:31
 * @LastEditTime: 2021-08-31 22:29:19
 * @Description: file content
 */

var react_1 = require("react");

function default_1(initState) {
  if (initState === void 0) {
    initState = false;
  }

  var _ref = (0, react_1.useState)(initState),
      isOpen = _ref[0],
      setIsOpen = _ref[1];

  var onOpen = (0, react_1.useCallback)(function () {
    setIsOpen(true);
  }, []);
  var onClose = (0, react_1.useCallback)(function () {
    setIsOpen(false);
  }, []);
  var onToggle = (0, react_1.useCallback)(function () {
    setIsOpen(function (prevState) {
      return !prevState;
    });
  }, []);
  return {
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose,
    onToggle: onToggle
  };
}

exports.default = default_1;