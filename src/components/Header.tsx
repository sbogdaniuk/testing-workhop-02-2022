import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

export const Header = ({ className, children, ...rest }: JSX.IntrinsicElements['header']) => {
  return (
    <header className={cn('header', className)} {...rest}>
      <Link to="/">👈 Main page</Link>
      {children}
    </header>
  )
}
