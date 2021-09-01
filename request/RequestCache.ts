/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 09:43:25
 * @LastEditTime: 2021-08-31 22:23:04
 * @Description: file content
 */
import { Key, Obj } from '@/types/util'
import { AxiosResponse } from 'axios'
import { isEqual } from 'lodash-es'

interface CacheInfo {
  result: Promise<AxiosResponse<unknown>>,
  params: Obj,
  cacheTime: Date
}

export default class RequestCache {
  static cacheMap = new Map<Key, CacheInfo[]>()

  static read(url: string, params: Obj, cacheDuration: number) {
    const { cacheMap } = RequestCache
    let cachedList = cacheMap.get(url)
    if (cachedList) {
      cachedList = cachedList.filter((info) => (+info.cacheTime) + cacheDuration > Date.now())
      for (const cacheInfo of cachedList) {
        if (isEqual(params, cacheInfo.params)) {
          return cacheInfo.result
        }
      }
    }
    return RequestCache.write.bind(
      null,
      url, params, cacheDuration,
    ) as (result: Promise<AxiosResponse<unknown>>) => void
  }

  static write(
    url: string,
    params: Obj,
    cacheDuration: number,
    result: Promise<AxiosResponse<unknown>>,
  ) {
    const { cacheMap } = RequestCache
    const cachedList = (cacheMap.get(url) ?? [])
      .filter((info) => (+info.cacheTime) + cacheDuration < Date.now())
    cachedList.push({
      result,
      params,
      cacheTime: new Date(),
    })
    cacheMap.set(url, cachedList)
  }
}
