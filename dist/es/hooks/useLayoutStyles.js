function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.parse-int.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:43:26
 * @LastEditTime: 2021-08-31 22:05:51
 * @Description: file content
 */
import { clamp, isArray, isNumber, omit } from 'lodash-es';
import { useMemo } from 'react';
var properties = {
  p: 'padding',
  py: ['paddingTop', 'paddingBottom'],
  px: ['paddingLeft', 'paddingRight'],
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  m: 'margin',
  mx: ['marginRight', 'marginLeft'],
  my: ['marginTop', 'marginBottom'],
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  h: 'height',
  w: 'width',
  size: ['height', 'width'],
  round: 'borderRadius'
};
var GRID_UNIT = 4.1666666666666666666666666666667;

function computedLayoutValue(v) {
  if (isNumber(v)) {
    return v * 4;
  }

  if (/^([0-9.]+)(g)$/i.test(v)) {
    return clamp(parseInt(v, 10), 0, 24) * GRID_UNIT + "vw";
  }

  if (/^([0-9.]+)(px)$/i.test(v)) {
    return parseInt(v, 10);
  }

  throw new TypeError(v + " \u4E0D\u662F\u4E00\u4E2A\u5408\u6CD5\u7684\u503C\uFF0C\u6B63\u786E\u7684\u503C\u5E94\u8BE5\u7C7B\u4F3C\u4E8E\uFF1A12, 12.2, '12.2px', '12g'");
}

var shortcuts = Object.keys(properties);
var omitKeys = [].concat(shortcuts, ['style', 'children', 'className']);
export default (function (props, componentStyle) {
  return useMemo(function () {
    var css = {};

    for (var _iterator = _createForOfIteratorHelperLoose(shortcuts), _step; !(_step = _iterator()).done;) {
      var k = _step.value;

      if (k in props) {
        var value = computedLayoutValue(props[k]);
        var cssProperty = properties[k];

        if (isArray(cssProperty)) {
          for (var _iterator2 = _createForOfIteratorHelperLoose(cssProperty), _step2; !(_step2 = _iterator2()).done;) {
            var v = _step2.value;
            css[v] = value;
          }
        } else {
          css[cssProperty] = value;
        }
      }
    }

    return Object.assign(css, componentStyle, omit(props, omitKeys), props.style);
  }, [props, componentStyle]);
});