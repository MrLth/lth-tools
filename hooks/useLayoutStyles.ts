/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:43:26
 * @LastEditTime: 2021-08-31 22:05:51
 * @Description: file content
 */
import {
  clamp, isArray, isNumber, omit,
} from 'lodash-es'
import React, { useMemo } from 'react'

const properties = {
  p: 'padding',
  py: ['paddingTop', 'paddingBottom'],
  px: ['paddingLeft', 'paddingRight'],
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  m: 'margin',
  mx: ['marginRight', 'marginLeft'],
  my: ['marginTop', 'marginBottom'],
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  h: 'height',
  w: 'width',
  size: ['height', 'width'],
  round: 'borderRadius',
} as const
type LayoutValue = number | string
type LayoutProps = Record<keyof typeof properties, LayoutValue>
  & React.CSSProperties
  & {
    style: React.CSSProperties
    className: string
  }

const GRID_UNIT = 4.1666666666666666666666666666667
function computedLayoutValue(v: LayoutValue) {
  if (isNumber(v)) {
    return v * 4
  }
  if (/^([0-9.]+)(g)$/i.test(v)) {
    return `${clamp(parseInt(v, 10), 0, 24) * GRID_UNIT}vw`
  }
  if (/^([0-9.]+)(px)$/i.test(v)) {
    return parseInt(v, 10)
  }
  throw new TypeError(`${v} 不是一个合法的值，正确的值应该类似于：12, 12.2, '12.2px', '12g'`)
}

const shortcuts = Object.keys(properties)
const omitKeys = [...shortcuts, 'style', 'children', 'className']
export type LayoutComponentProps = React.PropsWithChildren<Partial<LayoutProps>>

export default (
  props: LayoutComponentProps,
  componentStyle: React.CSSProperties,
) => useMemo(() => {
  const css: React.CSSProperties = {}
  for (const k of shortcuts) {
    if (k in props) {
      const value = computedLayoutValue(props[k])
      const cssProperty = properties[k]
      if (isArray(cssProperty)) {
        for (const v of cssProperty) {
          css[v as any] = value
        }
      } else {
        css[cssProperty as any] = value
      }
    }
  }
  return Object.assign(
    css,
    componentStyle,
    omit(props, omitKeys),
    props.style,
  )
}, [props, componentStyle])
