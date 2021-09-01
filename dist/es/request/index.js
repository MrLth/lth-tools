import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.symbol.iterator.js";
var _excluded = ["method", "cancelKey", "cache", "baseUrl"];

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.promise.finally.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-08-11 08:26:43
 * @LastEditTime: 2021-08-31 22:22:46
 * @Description: file content
 */
import axios from 'axios';
import { isFunction, isNumber } from 'lodash-es';
import qs from 'qs';
import { REQ_CFG, REQ_ERR, REQ_RETRY } from './config';
import RequestCache from './RequestCache';
axios.defaults.timeout = REQ_CFG.TIMEOUT;
var CancelToken = axios.CancelToken;
var cancelMap = new Map();
var requestingMap = new Map();

function request(url, params, config) {
  if (url === void 0) {
    url = '';
  }

  if (params === void 0) {
    params = {};
  }

  var _ref = config != null ? config : {},
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'get' : _ref$method,
      _ref$cancelKey = _ref.cancelKey,
      cancelKey = _ref$cancelKey === void 0 ? '' : _ref$cancelKey,
      cache = _ref.cache,
      _ref$baseUrl = _ref.baseUrl,
      baseUrl = _ref$baseUrl === void 0 ? '' : _ref$baseUrl,
      restConfig = _objectWithoutPropertiesLoose(_ref, _excluded);

  return new Promise(function (resolve, reject) {
    var reqUrl = baseUrl + url;
    var reqMethod = method.toLowerCase();
    var id = Symbol(reqUrl); // 缓存

    var cacheDuration = isNumber(cache) ? cache : cache ? REQ_CFG.CACHE_TIME : 0;
    var cachePromiseOrWrite = RequestCache.read(url, params, cacheDuration);
    var promise;

    if (!isFunction(cachePromiseOrWrite)) {
      promise = cachePromiseOrWrite;
    } else {
      var cancelToken = new CancelToken(function (canceler) {
        // 加入取消列表
        if (cancelKey) {
          var cancelKeyMap = cancelMap.get(cancelKey);

          if (cancelKeyMap) {
            cancelKeyMap.set(id, canceler);
          } else {
            cancelMap.set(cancelKey, new Map());
          }
        } // 加入请求列表


        var cancelInfo = requestingMap.get(reqUrl);
        var ids = cancelInfo ? cancelInfo.ids : new Set();
        ids.add(id);
        requestingMap.set(reqUrl, {
          ids: ids,
          lastId: id,
          canceler: canceler,
          params: params
        });
      });

      switch (reqMethod) {
        case 'get':
          promise = axios.get(reqUrl, Object.assign({
            params: params,
            cancelToken: cancelToken
          }, restConfig));
          break;

        case 'post':
          promise = axios.post(reqUrl, params, Object.assign({
            cancelToken: cancelToken
          }, restConfig));
          break;

        default:
          promise = axios.request({
            url: reqUrl,
            method: method,
            data: params,
            cancelToken: cancelToken
          });
      }

      var cacheWrite = cachePromiseOrWrite;
      cacheWrite(promise);
    }

    promise.then(function (response) {
      resolve(response.data);
    }).catch(function (error) {
      // 请求被取消
      if (axios.isCancel(error)) {
        return reject(REQ_ERR.CANCELED);
      } // 超时


      if (error.message.toLowerCase().includes('timeout')) {
        return reject(REQ_ERR.TIMEOUT);
      } // 网络错误


      if (error.message.toLowerCase().includes('network')) {
        return reject(REQ_ERR.NETWORK);
      }

      if (error && error.response) {
        if ([400, 401, 403, 404, 405, 408, 500, 501, 502, 503, 504, 505].includes(error.response.status)) {
          return reject(REQ_ERR.NETWORK);
        }
      }

      return reject(error);
    }).finally(function () {
      // 从取消列表中删除
      if (cancelKey) {
        var reqMap = cancelMap.get(cancelKey);

        if (reqMap) {
          reqMap.delete(id);

          if (reqMap.size === 0) {
            cancelMap.delete(cancelKey);
          }
        } else {
          console.log('cancelMap.has(cancelKey)', cancelMap.has(cancelKey));
        }
      } // 从请求列表中删除


      var requestInfo = requestingMap.get(reqUrl);

      if (requestInfo) {
        var lastId = requestInfo.lastId,
            ids = requestInfo.ids;
        ids.delete(id);

        if (ids.size === 0) {
          requestingMap.delete(reqUrl);
        } else if (lastId === id) {
          requestingMap.set(reqUrl, {
            ids: ids,
            lastId: null,
            canceler: null,
            params: null
          });
        }
      } else {
        console.log('requestingMap.has(reqUrl)', requestingMap.has(reqUrl));
      }
    });
  });
}

export function requestCreator(_temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      _ref2$baseUrl = _ref2.baseUrl,
      baseUrl = _ref2$baseUrl === void 0 ? '' : _ref2$baseUrl,
      _ref2$isFormData = _ref2.isFormData,
      isFormData = _ref2$isFormData === void 0 ? false : _ref2$isFormData;

  var get = function get(url, params, config) {
    return request(url, params, Object.assign({
      cache: true
    }, config, {
      baseUrl: baseUrl
    }));
  };

  var post = isFormData ? function (url, params, config) {
    return request(url, qs.stringify(params), Object.assign({
      cache: false,
      baseUrl: baseUrl
    }, config, {
      headers: Object.assign({}, config == null ? void 0 : config.headers, {
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      method: 'post'
    }));
  } : function (url, params, config) {
    return request(url, params, Object.assign({
      cache: false,
      baseUrl: baseUrl
    }, config, {
      method: 'post'
    }));
  };
  return [get, post];
}
export var cancelRequest = function cancelRequest(cancelKey) {
  var cancelers = cancelMap.get(cancelKey);

  if (cancelers) {
    for (var _iterator = _createForOfIteratorHelperLoose(cancelers.values()), _step; !(_step = _iterator()).done;) {
      var canceler = _step.value;
      canceler();
    }
  }
}; // 超时自动重传

axios.interceptors.response.use(function (response) {
  return response;
}, function (err) {
  var _err$message, _headers$REQ_RETRY$FI;

  if (!((_err$message = err.message) != null && _err$message.toLowerCase().includes('timeout'))) {
    return Promise.reject(err);
  }

  var headers = err.config.headers;
  headers[REQ_RETRY.FIELD] = (_headers$REQ_RETRY$FI = headers[REQ_RETRY.FIELD]) != null ? _headers$REQ_RETRY$FI : 0;

  if (headers[REQ_RETRY.FIELD] >= REQ_RETRY.COUNT) {
    return Promise.reject(err);
  }

  headers[REQ_RETRY.FIELD] += 1;
  var backOff = new Promise(function (resolve) {
    setTimeout(resolve, REQ_RETRY.INTERVAL);
  });
  return backOff.then(function () {
    return axios(err.config);
  });
});