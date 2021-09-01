/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:51:53
 * @LastEditTime: 2021-08-17 15:08:30
 * @Description: file content
 */
import React from 'react'
import useLayoutStyles, { LayoutComponentProps } from '../hooks/useLayoutStyles'

const componentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  justifyContent: 'center',
}
export default (props: LayoutComponentProps) => {
  const { children, className } = props
  const style = useLayoutStyles(props, componentStyle)

  return (
    <div className={className} style={style}>{children}</div>
  )
}
