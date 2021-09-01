/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-29 19:19:40
 * @LastEditTime: 2021-08-29 20:16:48
 * @Description: file content
 */
import React, { createContext, useContext, useLayoutEffect, useState } from "react";


const initState = {
  loading: false,
  depends: new Map<Symbol, boolean[]>(),
}


function useStore() {
  const [store, setStore] = useState(initState)
  return {
    ...store,
    setStore
  }
}
const Context = createContext<ReturnType<typeof useStore> | null>(null);

export function catchLoading<P extends object>(
  BaseComponent: React.FunctionComponent<P>
): React.FunctionComponent<P> {

  return (props) => (
    <Context.Provider value={useStore()}>
      <BaseComponent {...props} />
    </Context.Provider>
  )
}

export function useCatchLoadingDeps(...depends: boolean[]) {
  const store = useContext(Context);
  const [id] = useState(Symbol('happy loading depends id'))
  if (store === null) {
    throw new Error("your target Component must be wrapped by Provider");
  }

  useLayoutEffect(() => {
    store.depends.set(id, depends)
    const newLoadingState = [...store.depends.values()].flat().every(Boolean)
    if (newLoadingState !== store.loading) {
      store.setStore({
        loading: newLoadingState,
        depends: store.depends
      })
    }
  }, [...depends])

}

export function useCatchLoading() {
  const store = useContext(Context);
  if (store === null) {
    throw new Error("your target Component must be wrapped by Provider");
  }
  return store.loading
}