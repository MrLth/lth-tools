"use strict";

import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.flat.js";
import "core-js/modules/es.array.concat.js";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCatchLoading = exports.useCatchLoadingDeps = exports.catchLoading = void 0;
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-29 19:19:40
 * @LastEditTime: 2021-08-29 20:16:48
 * @Description: file content
 */

var react_1 = require("react");

var initState = {
  loading: false,
  depends: new Map()
};

function useStore() {
  var _ref = (0, react_1.useState)(initState),
      store = _ref[0],
      setStore = _ref[1];

  return Object.assign({}, store, {
    setStore: setStore
  });
}

var Context = (0, react_1.createContext)(null);

function catchLoading(BaseComponent) {
  return function (props) {
    return react_1.default.createElement(Context.Provider, {
      value: useStore()
    }, react_1.default.createElement(BaseComponent, Object.assign({}, props)));
  };
}

exports.catchLoading = catchLoading;

function useCatchLoadingDeps() {
  for (var _len = arguments.length, depends = new Array(_len), _key = 0; _key < _len; _key++) {
    depends[_key] = arguments[_key];
  }

  var store = (0, react_1.useContext)(Context);

  var _ref2 = (0, react_1.useState)(Symbol('happy loading depends id')),
      id = _ref2[0];

  if (store === null) {
    throw new Error("your target Component must be wrapped by Provider");
  }

  (0, react_1.useLayoutEffect)(function () {
    store.depends.set(id, depends);
    var newLoadingState = [].concat(store.depends.values()).flat().every(Boolean);

    if (newLoadingState !== store.loading) {
      store.setStore({
        loading: newLoadingState,
        depends: store.depends
      });
    }
  }, [].concat(depends));
}

exports.useCatchLoadingDeps = useCatchLoadingDeps;

function useCatchLoading() {
  var store = (0, react_1.useContext)(Context);

  if (store === null) {
    throw new Error("your target Component must be wrapped by Provider");
  }

  return store.loading;
}

exports.useCatchLoading = useCatchLoading;