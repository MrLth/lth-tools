/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-08 16:31:46
 * @LastEditTime: 2021-08-31 22:22:55
 * @Description: file content
 */

import { Key, Obj } from '@/types/util';
import { AxiosRequestConfig, Canceler, Method } from 'axios';

export interface Request {
  <T>(url: string, params?: Obj, config?: RequestConfig): Promise<T>
}

export interface RequestConfig extends AxiosRequestConfig {
  method?: Method,
  headers?: Obj,
  baseUrl?: string,
  cache?: boolean | number,
  cancelKey?: Key,
}

export interface RequestCreatorConfig extends AxiosRequestConfig {
  baseUrl?: string,
  isFormData?: boolean
}

export interface CancelInfo {
  ids: Set<Key>,
  lastId: Key | null
  canceler: Canceler | null,
  params: Obj | null
}
