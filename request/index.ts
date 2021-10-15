/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2020-08-11 08:26:43
 * @LastEditTime: 2021-10-15 11:57:36
 * @Description: file content
 */
import axios, { AxiosResponse, Canceler } from 'axios';
import { defaultsDeep, isFunction, isNumber } from 'lodash-es';
import qs from 'qs';
import { REQ_CFG, REQ_ERR, REQ_RETRY } from './config';
import RequestCache from './RequestCache';
import { CancelInfo, RequestConfig, Request, RequestCreatorConfig } from './request.type';
import { Key } from '@/types/util';

axios.defaults.timeout = REQ_CFG.TIMEOUT;

const { CancelToken } = axios;

const cancelMap = new Map<Key, Map<Key, Canceler>>();
const requestingMap = new Map<string, CancelInfo>();

function request<T>(
  url = '',
  params = {},
  config: RequestConfig
): Promise<T> {
  const {
    method = 'get',
    cancelKey = '',
    cache,
    baseUrl = '',
    ...restConfig
  } = config ?? {}

  return new Promise((resolve, reject) => {
    const reqUrl = baseUrl + url;
    const reqMethod = method.toLowerCase();
    const id = Symbol(reqUrl);

    // 缓存
    const cacheDuration = isNumber(cache) ? cache : (cache ? REQ_CFG.CACHE_TIME : 0)
    const cachePromiseOrWrite = RequestCache.read(url, params, cacheDuration)
    let promise: Promise<AxiosResponse<unknown>>;
    if (!isFunction(cachePromiseOrWrite)) {
      promise = cachePromiseOrWrite
    } else {
      const cancelToken = new CancelToken((canceler) => {
        // 加入取消列表
        if (cancelKey) {
          const cancelKeyMap = cancelMap.get(cancelKey)
          if (cancelKeyMap) {
            cancelKeyMap.set(id, canceler);
          } else {
            cancelMap.set(cancelKey, new Map());
          }
        }
        // 加入请求列表
        const cancelInfo = requestingMap.get(reqUrl)
        const ids = cancelInfo ? cancelInfo.ids : new Set<Key>();
        ids.add(id);
        requestingMap.set(reqUrl, {
          ids,
          lastId: id,
          canceler,
          params,
        });
      });

      switch (reqMethod) {
        case 'get':
          promise = axios.get(reqUrl, { params, cancelToken, ...restConfig });
          break;
        case 'post':
          promise = axios.post(reqUrl, params, { cancelToken, ...restConfig });
          break;
        default:
          promise = axios.request({
            url: reqUrl,
            method,
            data: params,
            cancelToken,
          });
      }
      const cacheWrite = cachePromiseOrWrite
      cacheWrite(promise)
    }

    promise
      .then((response) => {
        resolve(response.data as T);
      })
      .catch((error) => {
        // 请求被取消
        if (axios.isCancel(error)) {
          return reject(REQ_ERR.CANCELED)
        }
        // 超时
        if (error.message.toLowerCase().includes('timeout')) {
          return reject(REQ_ERR.TIMEOUT);
        }
        // 网络错误
        if (error.message.toLowerCase().includes('network')) {
          return reject(REQ_ERR.NETWORK);
        }
        if (error && error.response) {
          if (
            [400, 401, 403, 404, 405, 408, 500, 501, 502, 503, 504, 505].includes(
              error.response.status,
            )
          ) {
            return reject(REQ_ERR.NETWORK + error.response.status);
          }
        }

        return reject(error);
      })
      .finally(() => {
        // 从取消列表中删除
        if (cancelKey) {
          const reqMap = cancelMap.get(cancelKey)
          if (reqMap) {
            reqMap.delete(id);
            if (reqMap.size === 0) {
              cancelMap.delete(cancelKey);
            }
          } else {
            console.log('cancelMap.has(cancelKey)', cancelMap.has(cancelKey));
          }
        }
        // 从请求列表中删除
        const requestInfo = requestingMap.get(reqUrl)
        if (requestInfo) {
          const { lastId, ids } = requestInfo
          ids.delete(id);
          if (ids.size === 0) {
            requestingMap.delete(reqUrl);
          } else if (lastId === id) {
            requestingMap.set(reqUrl, {
              ids,
              lastId: null,
              canceler: null,
              params: null,
            });
          }
        } else {
          console.log('requestingMap.has(reqUrl)', requestingMap.has(reqUrl));
        }
      });
  });
}

export function requestCreator({ baseUrl = '', isFormData = false, ...defaultConfig }: RequestCreatorConfig = {}): [Request, Request] {
  const get: Request = (url, params, config) => request(
    url,
    params,
    {
      cache: true,
      ...defaultsDeep(config, defaultsDeep),
      baseUrl,
    },
  );

  const post: Request = isFormData
    ? (url, params, config) => request(url, qs.stringify(params), {
      cache: false,
      baseUrl,
      ...defaultsDeep(config, defaultsDeep),
      headers: {
        ...config?.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
    })
    : (url, params, config) => request(url, params, {
      cache: false,
      baseUrl,
      ...defaultsDeep(config, defaultsDeep),
      method: 'post',
    });

  return [get, post];
}

export const cancelRequest = (cancelKey: Key): void => {
  const cancelers = cancelMap.get(cancelKey)
  if (cancelers) {
    for (const canceler of cancelers.values()) {
      canceler();
    }
  }
};

// 超时自动重传
axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (!err.message?.toLowerCase().includes('timeout')) {
      return Promise.reject(err);
    }

    const { headers } = err.config;

    headers[REQ_RETRY.FIELD] = headers[REQ_RETRY.FIELD] ?? 0;

    if (headers[REQ_RETRY.FIELD] >= REQ_RETRY.COUNT) {
      return Promise.reject(err);
    }

    headers[REQ_RETRY.FIELD] += 1;

    const backOff = new Promise((resolve) => {
      setTimeout(resolve, REQ_RETRY.INTERVAL);
    });
    return backOff.then(() => axios(err.config));
  },
);
