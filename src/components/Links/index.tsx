import React from 'react'

import * as S from '@/components/Links/styles'
import type { LinkProps } from '@/components/Links/types'

export function IconLink({
  to,
  href,
  className,
  children,
  activeClassName,
  sansBasePath,
  ariaLabel,
}: LinkProps): React.JSX.Element {
  return (
    <S.IconLink
      activeClassName={activeClassName}
      ariaLabel={ariaLabel}
      className={className}
      href={href}
      sansBasePath={sansBasePath}
      to={to}
    >
      {children}
    </S.IconLink>
  )
}

export function PrimaryLink({
  to,
  href,
  className,
  children,
  activeClassName,
  sansBasePath,
  ariaLabel,
}: LinkProps): React.JSX.Element {
  return (
    <S.PrimaryLink
      activeClassName={activeClassName}
      ariaLabel={ariaLabel}
      className={className}
      href={href}
      sansBasePath={sansBasePath}
      to={to}
    >
      {children}
    </S.PrimaryLink>
  )
}

export function AnimatedLink({
  to,
  href,
  className,
  children,
  activeClassName,
  sansBasePath,
  ariaLabel,
}: LinkProps): React.JSX.Element {
  return (
    <S.AnimatedLink
      activeClassName={activeClassName}
      ariaLabel={ariaLabel}
      className={className}
      href={href}
      sansBasePath={sansBasePath}
      to={to}
    >
      {children}
    </S.AnimatedLink>
  )
}

export function TransparentLink({
  to,
  href,
  className,
  children,
  activeClassName,
  sansBasePath,
  ariaLabel,
}: LinkProps): React.JSX.Element {
  return (
    <S.TransparentLink
      activeClassName={activeClassName}
      ariaLabel={ariaLabel}
      className={className}
      href={href}
      sansBasePath={sansBasePath}
      to={to}
    >
      {children}
    </S.TransparentLink>
  )
}

export function HeadingLink({
  to,
  href,
  className,
  children,
  activeClassName,
  sansBasePath,
  ariaLabel,
}: LinkProps): React.JSX.Element {
  return (
    <S.HeadingLink
      activeClassName={activeClassName}
      ariaLabel={ariaLabel}
      className={className}
      href={href}
      sansBasePath={sansBasePath}
      to={to}
    >
      {children}
    </S.HeadingLink>
  )
}
