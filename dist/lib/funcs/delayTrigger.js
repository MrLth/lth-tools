"use strict";
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-29 18:50:11
 * @LastEditTime: 2021-08-31 22:14:36
 * @Description: file content
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn) {
  var timerID;
  return {
    delay: function delay(time) {
      clearTimeout(timerID);

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      timerID = setTimeout(fn.bind(null, args), time);
    },
    trigger: function trigger() {
      clearTimeout(timerID);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      fn.call(null, args);
    }
  };
};