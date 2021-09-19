/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:56:23
 * @LastEditTime: 2021-09-19 16:51:47
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
  center?: boolean
}) => {
  const {
    children, center = false, className,
  } = props
  const style = useLayoutStyles(props, componentStyle)

  const dom = useMemo(() => {
    const temp = document.createElement('div')
    document.body.appendChild(temp)
    return temp
  }, [])

  useLayoutEffect(() => {
    Object.assign(
      dom.style,
      defaultContainerStyle,
      center ? centerStyles : null,
      style,
    )
  }, [dom, style, center])

  useLayoutEffect(() => {
    if (className) {
      dom.className = className
    }
  }, [dom, className])


  useEffect(() => () => {
    document.body.removeChild(dom)
  }, [dom])

  return createPortal(
    <>{children}</>,
    dom,
  )
}
