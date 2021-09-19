/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-08-17 13:56:23
 * @LastEditTime: 2021-09-19 17:25:07
 * @Description: file content
 */

import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import useLayoutStyles, { LayoutComponentProps } from '../hooks/useLayoutStyles'

import c from '../css/ZStack.m.css'


export default (props: LayoutComponentProps & {
  center?: boolean
}) => {
  const {
    children, center = false, className,
  } = props
  const style = useLayoutStyles(props, {})

  const dom = useMemo(() => {
    const temp = document.createElement('div')
    temp.classList.add(c.default)
    document.body.appendChild(temp)
    return temp
  }, [])

  useLayoutEffect(() => {
    Object.assign(
      dom.style,
      style,
    )
  }, [dom, style])

  useLayoutEffect(() => {
    if (center) {
      dom.classList.add(c.center)
    } else {
      dom.classList.remove(c.center)
    }
  }, [dom, center])

  useLayoutEffect(() => {
    if (className) {
      dom.classList.add(...className.split(' '))
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
