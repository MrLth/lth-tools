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

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-29 19:19:40
 * @LastEditTime: 2021-08-29 20:16:48
 * @Description: file content
 */
import React, { createContext, useContext, useLayoutEffect, useState } from "react";
var initState = {
  loading: false,
  depends: new Map()
};

function useStore() {
  var _useState = useState(initState),
      store = _useState[0],
      setStore = _useState[1];

  return Object.assign({}, store, {
    setStore: setStore
  });
}

var Context = /*#__PURE__*/createContext(null);
export function catchLoading(BaseComponent) {
  return function (props) {
    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: useStore()
    }, /*#__PURE__*/React.createElement(BaseComponent, Object.assign({}, props)));
  };
}
export function useCatchLoadingDeps() {
  for (var _len = arguments.length, depends = new Array(_len), _key = 0; _key < _len; _key++) {
    depends[_key] = arguments[_key];
  }

  var store = useContext(Context);

  var _useState2 = useState(Symbol('happy loading depends id')),
      id = _useState2[0];

  if (store === null) {
    throw new Error("your target Component must be wrapped by Provider");
  }

  useLayoutEffect(function () {
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
export function useCatchLoading() {
  var store = useContext(Context);

  if (store === null) {
    throw new Error("your target Component must be wrapped by Provider");
  }

  return store.loading;
}