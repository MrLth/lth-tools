/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-03-08 16:33:25
 * @LastEditTime: 2021-08-31 08:29:25
 * @Description: file content
 */

export enum REQ_CFG {
  TIMEOUT = 8000,
  CACHE_TIME = 1000
}

export enum REQ_ERR {
  TIMEOUT = 'TIMEOUT',
  CANCELED = 'CANCELED',
  NETWORK = 'NETWORK'
}

export enum REQ_RETRY {
  COUNT = 2,
  FIELD = 'Axios_Retry_Count',
  INTERVAL = 1000
}
