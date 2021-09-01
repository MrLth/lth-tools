
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-31 21:54:20
 * @LastEditTime: 2021-08-31 22:32:27
 * @Description: file content
 */
export const isDev = process.env.NODE_ENV === 'development'

export { Key, Obj } from "./types/util"
export { PromiseInnerType } from './types/PromiseInnerType'

export { requestCreator, cancelRequest } from './request'

export { default as Center } from './layoutComps/Center'
export { default as Col } from './layoutComps/Col'
export { default as Row } from './layoutComps/Row'
export { default as ZStack } from './layoutComps/ZStack'

export { default as useRefSync } from './hooks/useRefSync'
export { default as useDisclose } from './hooks/useDisclose'
export { default as useListCmp } from './hooks/useListCmp'

export { catchLoading, useCatchLoadingDeps, useCatchLoading } from './funcs/catchLoading'
export { default as delayTrigger } from './funcs/delayTrigger'
export { default as format } from './funcs/format'
export { default as moduleClassnames } from './funcs/moduleClassnames'
export { default as numSplit } from './funcs/numSplit'
export { default as sleep } from './funcs/sleep'

export * from './colors/antd'
