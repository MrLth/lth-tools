/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:56:23
 * @LastEditTime: 2021-08-17 15:09:05
 * @Description: file content
 */

import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import useLayoutStyles, { LayoutComponentProps } from '../hooks/useLayoutStyles'

const componentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
}
const defaultContainerStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  pointerEvents: 'none',
}
const centerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export default (props: LayoutComponentProps & {
  containerStyle?: React.CSSProperties,
  center?: boolean
}) => {
  const {
    children, containerStyle, center = false, className,
  } = props
  const style = useLayoutStyles(props, componentStyle)

  const dom = useMemo(() => {
    const temp = document.createElement('div')
    temp.classList.add('popup')
    document.body.appendChild(temp)
    return temp
  }, [])

  useLayoutEffect(() => {
    Object.assign(
      dom.style,
      defaultContainerStyle,
      center ? centerStyles : null,
      containerStyle,
    )
  }, [dom, containerStyle, center])

  useEffect(() => () => {
    document.body.removeChild(dom)
  }, [dom])

  return createPortal(
    <div className={className} style={style}>{children}</div>,
    dom,
  )
}
