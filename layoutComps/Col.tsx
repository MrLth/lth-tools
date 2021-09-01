/* eslint-disable react/no-unused-prop-types */
/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 10:39:23
 * @LastEditTime: 2021-08-17 15:08:41
 * @Description: file content
 */

import React from 'react'
import useLayoutStyles, { LayoutComponentProps } from '../hooks/useLayoutStyles'

const componentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}
export default (props: LayoutComponentProps) => {
  const { children, className } = props
  const style = useLayoutStyles(props, componentStyle)

  return (
    <div className={className} style={style}>{children}</div>
  )
}
