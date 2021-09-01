function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import { isEqual } from 'lodash-es';

var RequestCache = /*#__PURE__*/function () {
  function RequestCache() {}

  RequestCache.read = function read(url, params, cacheDuration) {
    var cacheMap = RequestCache.cacheMap;
    var cachedList = cacheMap.get(url);

    if (cachedList) {
      cachedList = cachedList.filter(function (info) {
        return +info.cacheTime + cacheDuration > Date.now();
      });

      for (var _iterator = _createForOfIteratorHelperLoose(cachedList), _step; !(_step = _iterator()).done;) {
        var cacheInfo = _step.value;

        if (isEqual(params, cacheInfo.params)) {
          return cacheInfo.result;
        }
      }
    }

    return RequestCache.write.bind(null, url, params, cacheDuration);
  };

  RequestCache.write = function write(url, params, cacheDuration, result) {
    var _cacheMap$get;

    var cacheMap = RequestCache.cacheMap;
    var cachedList = ((_cacheMap$get = cacheMap.get(url)) != null ? _cacheMap$get : []).filter(function (info) {
      return +info.cacheTime + cacheDuration < Date.now();
    });
    cachedList.push({
      result: result,
      params: params,
      cacheTime: new Date()
    });
    cacheMap.set(url, cachedList);
  };

  return RequestCache;
}();

RequestCache.cacheMap = new Map();
export { RequestCache as default };