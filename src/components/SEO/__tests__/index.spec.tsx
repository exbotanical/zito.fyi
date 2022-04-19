import { config, post } from '@@/fixtures'

import { SEO } from '../index'

jest.mock('@/config/useConfig', () => ({
  useConfig: jest.fn(() => config),
}))

describe('component SEO', () => {
  it('renders correctly for posts', () => {
    const seoData = SEO({ post })

    expect(seoData).toMatchSnapshot()
  })

  it('renders correctly on pages', () => {
    const seoData = SEO({})

    expect(seoData).toMatchSnapshot()
  })
})
