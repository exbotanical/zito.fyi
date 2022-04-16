import { screen } from '@testing-library/react'
import React from 'react'
import 'jest-styled-components'

import { config } from '@@/fixtures'
import { RenderStyled } from '@@/utils/styled'

import { Socials } from '../index'

const user = config.user

jest.mock('@/config/useConfig', () => ({
  useConfig: jest.fn(() => config)
}))

describe('component Socials', () => {
  it('renders social links', async () => {
    RenderStyled(<Socials />)

    const twitterLink = screen.getByRole('link', {
      name: 'Twitter Profile'
    })

    expect(twitterLink).toHaveAttribute(
      'href',
      `https://twitter.com/${user.twitterHandle}`
    )

    const githubLink = await screen.findByRole('link', {
      name: 'GitHub Profile'
    })

    expect(githubLink).toHaveAttribute(
      'href',
      `https://github.com/${user.github}`
    )

    const linkedInLink = await screen.findByRole('link', {
      name: 'LinkedIn Profile'
    })

    expect(linkedInLink).toHaveAttribute(
      'href',
      `https://www.linkedin.com/in/${user.linkedIn}`
    )

    const eMailLink = await screen.findByRole('link', { name: 'E-Mail' })

    expect(eMailLink).toHaveAttribute('href', `mailto:${user.email}`)
  })

  it('renders RSS link when `includeRss` is `true`', async () => {
    RenderStyled(<Socials includeRss />)

    const rssLink = await screen.findByRole('link', { name: 'RSS Feed' })
    expect(rssLink).toHaveAttribute('href', '/rss.xml')
  })

  it('does not render RSS link when `includeRss` is `false`', () => {
    RenderStyled(<Socials />)

    const rssLink = screen.queryByRole('link', { name: 'RSS Feed' })

    expect(rssLink).not.toBeInTheDocument()
  })
})
