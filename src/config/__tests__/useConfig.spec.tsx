import { renderHook } from '@testing-library/react-hooks'
import * as gatsby from 'gatsby'
import { mocked } from 'jest-mock'

import { config } from '@@/fixtures/config'

import { useConfig } from '../useConfig'

const siteConfigQueryResponse = {
  site: {
    siteMetadata: {
      config
    }
  }
}

jest.mock('gatsby', () => {
  const actualGatsby = jest.requireActual<typeof gatsby>('gatsby')

  return {
    ...actualGatsby,
    useStaticQuery: jest.fn(),
    graphql: jest.fn()
  }
})

const mockedGatsby = mocked(gatsby, true)

describe('hook `useConfig`', () => {
  it('correctly queries and provides site configuration data', () => {
    mockedGatsby.useStaticQuery.mockImplementation(
      () => siteConfigQueryResponse
    )

    const { result } = renderHook(() => useConfig())

    expect(mockedGatsby.graphql).toHaveBeenCalledTimes(1)
    expect(mockedGatsby.useStaticQuery).toHaveBeenCalledTimes(1)

    expect(result.current).toBe(config)
  })

  it('throws an error if site configuration is not extant', () => {
    mockedGatsby.useStaticQuery.mockImplementation(() => ({ site: undefined }))

    const { result } = renderHook(useConfig)
    expect(result.error).toBeDefined()

    expect(mockedGatsby.graphql).toHaveBeenCalledTimes(2) // ?
    expect(mockedGatsby.useStaticQuery).toHaveBeenCalledTimes(2)
  })
})
