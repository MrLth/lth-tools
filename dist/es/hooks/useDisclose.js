/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-06-14 23:45:31
 * @LastEditTime: 2021-08-31 22:29:19
 * @Description: file content
 */
import { useCallback, useState } from "react";
export default function (initState) {
  if (initState === void 0) {
    initState = false;
  }

  var _useState = useState(initState),
      isOpen = _useState[0],
      setIsOpen = _useState[1];

  var onOpen = useCallback(function () {
    setIsOpen(true);
  }, []);
  var onClose = useCallback(function () {
    setIsOpen(false);
  }, []);
  var onToggle = useCallback(function () {
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