import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.concat.js";

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-31 21:55:58
 * @LastEditTime: 2021-08-31 21:56:03
 * @Description: file content
 */
import { isString } from "lodash-es";
export default (function (module) {
  return function () {
    var classList = new Set();

    for (var _len = arguments.length, paras = new Array(_len), _key = 0; _key < _len; _key++) {
      paras[_key] = arguments[_key];
    }

    for (var _i = 0, _paras = paras; _i < _paras.length; _i++) {
      var para = _paras[_i];

      if (isString(para)) {
        classList.add(module[para]);
      } else {
        for (var _i2 = 0, _Object$entries = Object.entries(para); _i2 < _Object$entries.length; _i2++) {
          var _Object$entries$_i = _Object$entries[_i2],
              k = _Object$entries$_i[0],
              v = _Object$entries$_i[1];
          if (v) classList.add(module[k]);
        }
      }
    }

    return [].concat(classList).join(' ');
  };
});