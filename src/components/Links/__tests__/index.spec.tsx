import { screen, cleanup } from '@testing-library/react'
import * as gatsby from 'gatsby'
import { mocked } from 'jest-mock'
import cloneDeep from 'lodash.clonedeep'
import React from 'react'

import { useConfig } from '@/config'
import type { SiteConfig } from '@/types'

import { config } from '@@/fixtures'
import { RenderStyled } from '@@/utils/styled'

import { BaseLink } from '../BaseLink'

jest.mock('@/config/useConfig', () => ({
  useConfig: jest.fn(() => config),
}))

const testLink = 'https://example.com/local/path'
const mockedUseConfig = mocked(useConfig)

const testConfig = cloneDeep<SiteConfig>(config)
testConfig.basePath = '/'

jest.mock('gatsby', () => {
  const realGatsby = jest.requireActual<typeof gatsby>('gatsby')

  return {
    ...realGatsby,
    Link: jest.fn().mockImplementation(props => <realGatsby.Link {...props} />),
  }
})

const mockedGatsby = mocked(gatsby, { shallow: true })

describe('component Link', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders local links via GatsbyLink', () => {
    RenderStyled(<BaseLink to="/local/path">Test</BaseLink>)

    expect(mockedGatsby.Link).toHaveBeenCalledTimes(1)

    expect(mockedGatsby.Link).toHaveBeenCalledWith(
      expect.objectContaining({ to: '/local/path' }),
      expect.anything(),
    )
  })

  it('renders external links via an HTML element', () => {
    RenderStyled(<BaseLink to={testLink}>Test</BaseLink>)

    expect(mockedGatsby.Link).toHaveBeenCalledTimes(0)

    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute(
      'href',
      'https://example.com/local/path',
    )
  })

  it('renders children prop', () => {
    RenderStyled(<BaseLink to={testLink}>Test</BaseLink>)

    expect(screen.getByRole('link', { name: 'Test' })).toBeInTheDocument()

    cleanup()

    RenderStyled(<BaseLink to="/local/path">Test</BaseLink>)

    expect(screen.getByRole('link', { name: 'Test' })).toBeInTheDocument()
  })

  it('adds basePath to local URLs', () => {
    const configWithBasePath = cloneDeep(testConfig)
    configWithBasePath.basePath = '/base/path'

    mockedUseConfig.mockReturnValue(configWithBasePath)

    RenderStyled(<BaseLink to="/local/path">Test</BaseLink>)

    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute(
      'href',
      '/base/path/local/path',
    )

    cleanup()

    configWithBasePath.basePath = '/base/path'

    mockedUseConfig.mockReturnValue(configWithBasePath)

    RenderStyled(
      <BaseLink sansBasePath to="/local/path">
        Test
      </BaseLink>,
    )

    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute(
      'href',
      '/local/path',
    )

    cleanup()

    RenderStyled(<BaseLink to={testLink}>Test</BaseLink>)

    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute(
      'href',
      'https://example.com/local/path',
    )
  })

  it("prioritizes 'href' url over 'to' url", () => {
    mockedUseConfig.mockReturnValue(testConfig)

    RenderStyled(
      <BaseLink href="/correct/local/path" to="/incorrect/local/path">
        Test
      </BaseLink>,
    )

    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute(
      'href',
      '/correct/local/path',
    )
  })

  it("passes down 'activeClassName' to GatsbyLink", () => {
    RenderStyled(
      <BaseLink activeClassName="test-active-class" to="/local/path">
        Test
      </BaseLink>,
    )

    expect(mockedGatsby.Link).toHaveBeenCalledTimes(1)

    expect(mockedGatsby.Link).toHaveBeenCalledWith(
      expect.objectContaining({
        to: '/local/path',
        activeClassName: 'test-active-class',
      }),
      expect.anything(),
    )
  })

  it('passes down className and aria-label attributes', () => {
    RenderStyled(
      <BaseLink
        activeClassName="test-active-class"
        ariaLabel="test-label"
        to="/local/path"
      >
        Test
      </BaseLink>,
    )

    expect(mockedGatsby.Link).toHaveBeenCalledTimes(1)
    expect(mockedGatsby.Link).toHaveBeenCalledWith(
      expect.objectContaining({
        'activeClassName': 'test-active-class',
        'aria-label': 'test-label',
      }),
      expect.anything(),
    )

    expect(screen.getByRole('link', { name: 'test-label' })).toHaveAttribute(
      'aria-label',
      'test-label',
    )

    cleanup()

    RenderStyled(
      <BaseLink
        activeClassName="test-active-class"
        ariaLabel="test-label"
        to={testLink}
      >
        Test
      </BaseLink>,
    )

    expect(screen.getByRole('link', { name: 'test-label' })).toHaveAttribute(
      'aria-label',
      'test-label',
    )
  })
})
