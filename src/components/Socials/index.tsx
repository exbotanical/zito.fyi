import { LinkedinSquare, Github, Youtube } from '@styled-icons/boxicons-logos'
import { MailSend, Rss } from '@styled-icons/boxicons-regular'
import React from 'react'
import styled from 'styled-components'

import { useConfig } from '@/config'
import type { SiteConfig } from '@/types'

import { IconLink } from '../Links'

import type { StyledIcon } from '@styled-icons/styled-icon'

function generateLink(
  url: string,
  label: string,
  Icon: StyledIcon,
  sansBasePath = true,
) {
  return (
    <IconLink ariaLabel={label} sansBasePath={sansBasePath} to={url}>
      <Icon size={48} />
    </IconLink>
  )
}

function renderYouTubeLink(config: Readonly<SiteConfig>) {
  const url = config.user.youtubeUrl

  return url ? generateLink(url, 'YouTube Channel', Youtube) : null
}

function renderGitHubLink(config: Readonly<SiteConfig>) {
  const username = config.user.github

  if (!username) {
    return null
  }

  const url = `https://github.com/${username}`
  return generateLink(url, 'GitHub Profile', Github)
}

function generateLinkedInLink(config: Readonly<SiteConfig>) {
  const username = config.user.linkedIn

  if (!username) {
    return null
  }

  const url = `https://www.linkedin.com/in/${username}`
  return generateLink(url, 'LinkedIn Profile', LinkedinSquare)
}

function renderEmailLink(config: Readonly<SiteConfig>) {
  const url = `mailto:${config.user.email || ''}`
  return generateLink(url, 'E-Mail', MailSend)
}

function renderRssLink(config: Readonly<SiteConfig>) {
  return generateLink(config.site.rss, 'RSS Feed', Rss, false)
}

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

  @media (max-width: 350px) {
    gap: 0px;
  }

  @media (max-width: 250px) {
    display: block;
  }
`

export function Socials({
  includeRss,
  className,
}: IconLinksProps): JSX.Element | null {
  const config = useConfig()

  return (
    <LinkGrid className={className}>
      {renderYouTubeLink(config)}
      {renderGitHubLink(config)}
      {generateLinkedInLink(config)}
      {renderEmailLink(config)}
      {includeRss && renderRssLink(config)}
    </LinkGrid>
  )
}

Socials.defaultProps = defaultProps
