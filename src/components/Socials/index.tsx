import { Twitter, LinkedinSquare, Github } from '@styled-icons/boxicons-logos'
import { MailSend, Rss } from '@styled-icons/boxicons-regular'
import React from 'react'
import styled from 'styled-components'

import { useConfig } from '@/config'
import type { SiteConfig } from '@/types'

import { IconLink } from '../Links'

import type { StyledIcon } from '@styled-icons/styled-icon'

const generateLink = (
  url: string,
  label: string,
  Icon: StyledIcon,
  sansBasePath = true,
): JSX.Element => (
  <IconLink ariaLabel={label} sansBasePath={sansBasePath} to={url}>
    <Icon size={48} />
  </IconLink>
)

const renderTwitterLink = (
  config: Readonly<SiteConfig>,
): JSX.Element | null => {
  const username = config.user.twitterHandle

  if (!username) return null

  const url = `https://twitter.com/${username}`
  return generateLink(url, 'Twitter Profile', Twitter)
}

const renderGitHubLink = (config: Readonly<SiteConfig>): JSX.Element | null => {
  const username = config.user.github

  if (!username) return null

  const url = `https://github.com/${username}`
  return generateLink(url, 'GitHub Profile', Github)
}

const generateLinkedInLink = (
  config: Readonly<SiteConfig>,
): JSX.Element | null => {
  const username = config.user.linkedIn

  if (!username) return null

  const url = `https://www.linkedin.com/in/${username}`
  return generateLink(url, 'LinkedIn Profile', LinkedinSquare)
}

const renderEmailLink = (config: Readonly<SiteConfig>): JSX.Element => {
  const url = `mailto:${config.user.email || ''}`
  return generateLink(url, 'E-Mail', MailSend)
}

const renderRssLink = (config: Readonly<SiteConfig>): JSX.Element =>
  generateLink(config.site.rss, 'RSS Feed', Rss, false)

interface IconLinksProps {
  className?: string
  includeRss?: boolean
}

const defaultProps: IconLinksProps = {
  includeRss: false,
}

const LinkGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-auto-flow: column;
`

export function Socials({
  includeRss,
  className,
}: IconLinksProps): JSX.Element | null {
  const config = useConfig()

  return (
    <LinkGrid className={className}>
      {renderTwitterLink(config)}
      {renderGitHubLink(config)}
      {generateLinkedInLink(config)}
      {renderEmailLink(config)}
      {includeRss && renderRssLink(config)}
    </LinkGrid>
  )
}

Socials.defaultProps = defaultProps
