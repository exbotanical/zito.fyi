import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import 'jest-styled-components'

import { config, post } from '@@/fixtures'
import { RenderStyled } from '@@/utils/styled'

import { PostShare } from '../index'

jest.mock('@/config/useConfig', () => ({
  useConfig: jest.fn(() => config),
}))

const mockNavigator = () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  })
  jest.spyOn(navigator.clipboard, 'writeText')
}

describe('component `PostShare`', () => {
  beforeAll(() => {
    mockNavigator()
  })

  it('renders social links', () => {
    const { container } = RenderStyled(<PostShare post={post} />)

    const facebookButton = container.querySelector(
      'button[aria-label="facebook"]',
    )
    expect(facebookButton).toBeInTheDocument()

    const twitterButton = container.querySelector(
      'button[aria-label="twitter"]',
    )
    expect(twitterButton).toBeInTheDocument()

    const redditButton = container.querySelector('button[aria-label="reddit"]')
    expect(redditButton).toBeInTheDocument()

    const linkedinButton = container.querySelector(
      'button[aria-label="linkedin"]',
    )
    expect(linkedinButton).toBeInTheDocument()

    const linkButton = container.querySelector('div > svg')
    expect(linkButton).toBeInTheDocument()
  })

  it('renders a popup notification when the user clicks the post url copy button', async () => {
    const { container } = RenderStyled(<PostShare post={post} />)

    const linkButton = container.querySelector('div > svg')
    expect(linkButton).toBeInTheDocument()

    userEvent.click(linkButton as SVGSVGElement)

    const popupNotif = await screen.findByText('Link copied to clipboard')
    expect(popupNotif).toBeInTheDocument()

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
  })
})
