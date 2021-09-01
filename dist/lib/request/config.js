"use strict";
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-08 16:33:25
 * @LastEditTime: 2021-08-31 08:29:25
 * @Description: file content
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REQ_RETRY = exports.REQ_ERR = exports.REQ_CFG = void 0;
var REQ_CFG;

(function (REQ_CFG) {
  REQ_CFG[REQ_CFG["TIMEOUT"] = 8000] = "TIMEOUT";
  REQ_CFG[REQ_CFG["CACHE_TIME"] = 1000] = "CACHE_TIME";
})(REQ_CFG = exports.REQ_CFG || (exports.REQ_CFG = {}));

var REQ_ERR;

(function (REQ_ERR) {
  REQ_ERR["TIMEOUT"] = "TIMEOUT";
  REQ_ERR["CANCELED"] = "CANCELED";
  REQ_ERR["NETWORK"] = "NETWORK";
})(REQ_ERR = exports.REQ_ERR || (exports.REQ_ERR = {}));

var REQ_RETRY;

(function (REQ_RETRY) {
  REQ_RETRY[REQ_RETRY["COUNT"] = 2] = "COUNT";
  REQ_RETRY["FIELD"] = "Axios_Retry_Count";
  REQ_RETRY[REQ_RETRY["INTERVAL"] = 1000] = "INTERVAL";
})(REQ_RETRY = exports.REQ_RETRY || (exports.REQ_RETRY = {}));