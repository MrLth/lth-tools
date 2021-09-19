/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:56:23
 * @LastEditTime: 2021-09-19 18:12:42
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
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
}
const centerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export default (props: LayoutComponentProps & {
  container?: {
    style?: React.CSSProperties,
    className?: string
  }
  center?: boolean
  zIndex?: number
}) => {
  const {
    children, container = {}, center = false, className, zIndex
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
      container.style,
      zIndex ? { zIndex } : null
    )
  }, [dom, container.style, center, zIndex])

  useLayoutEffect(() => {
    if (container.className) {
      dom.className = container.className
    }
  }, [dom, container.className])

  useEffect(() => () => {
    document.body.removeChild(dom)
  }, [dom])

  return createPortal(
    <div className={className} style={style}>{children}</div>,
    dom,
  )
}
