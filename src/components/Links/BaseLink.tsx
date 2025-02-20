import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

import type { LinkProps } from '@/components/Links/types'
import { useConfig } from '@/config'

import { withBasePath } from '../../../node'

const isAbsolute = RegExp.prototype.test.bind(/^(?:[a-z]+:)?\/\//i)
const isEmail = (url: string) => url.startsWith('mailto')

export function BaseLink({
  to,
  href,
  className,
  children,
  activeClassName,
  sansBasePath,
  ariaLabel,
}: LinkProps): React.JSX.Element {
  const config = useConfig()
  const url = href || to

  if (isEmail(url) || isAbsolute(url)) {
    return (
      <a
        aria-label={ariaLabel}
        className={className}
        href={url}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    )
  }

  const isAnchor = url.startsWith('#')

  const internalUrl = sansBasePath ? url : withBasePath(config, url)

  return isAnchor ? (
    <a
      aria-label={ariaLabel}
      className={className}
      href={internalUrl}
      rel="noreferrer"
    >
      {children}
    </a>
  ) : (
    <GatsbyLink
      activeClassName={activeClassName}
      aria-label={ariaLabel}
      className={className}
      to={internalUrl}
    >
      {children}
    </GatsbyLink>
  )
}
