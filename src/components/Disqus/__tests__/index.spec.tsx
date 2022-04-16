import { mocked } from 'jest-mock'
import cloneDeep from 'lodash.clonedeep'
import React from 'react'

import { useConfig } from '@/config'

import { post, config } from '@@/fixtures'
import { RenderStyled } from '@@/utils/styled'

import { DisqusPlugin } from '../index'

jest.mock('@/config/useConfig', () => ({
  useConfig: jest.fn(() => config)
}))

const mockedUseConfig = mocked(useConfig)

describe('component `DisqusPlugin`', () => {
  it('renders correctly when config.disqusShortname is set', () => {
    const newConfig = cloneDeep(config)
    newConfig.site.disqusShortname = ''

    mockedUseConfig.mockReturnValue(newConfig)

    const { asFragment } = RenderStyled(<DisqusPlugin post={post} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when config.disqusShortname is not set', () => {
    const newConfig = cloneDeep(config)
    newConfig.site.disqusShortname = undefined

    mockedUseConfig.mockReturnValue(newConfig)

    const { asFragment } = RenderStyled(<DisqusPlugin post={post} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
