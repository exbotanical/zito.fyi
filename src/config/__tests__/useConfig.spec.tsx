import * as gatsby from 'gatsby'
import { mocked } from 'jest-mock'

import { config } from '@@/fixtures/config'

import { useConfig } from '../useConfig'

const siteConfigQueryResponse = {
  site: {
    siteMetadata: {
      config,
    },
  },
}

jest.mock('gatsby', () => {
  const actualGatsby = jest.requireActual<typeof gatsby>('gatsby')

  return {
    ...actualGatsby,
    useStaticQuery: jest.fn(),
    graphql: jest.fn(),
  }
})

const mockedGatsby = mocked(gatsby, { shallow: false })

describe('hook `useConfig`', () => {
  it('correctly queries and provides site configuration data', () => {
    mockedGatsby.useStaticQuery.mockImplementation(
      () => siteConfigQueryResponse as any,
    )

    const result = useConfig()

    expect(mockedGatsby.graphql).toHaveBeenCalledTimes(1)
    expect(mockedGatsby.useStaticQuery).toHaveBeenCalledTimes(1)

    expect(result).toBe(config)
  })

  it('throws an error if site configuration is not extant', () => {
    mockedGatsby.useStaticQuery.mockImplementation(
      () => ({ site: undefined }) as any,
    )

    expect(useConfig).toThrow()

    expect(mockedGatsby.graphql).toHaveBeenCalledTimes(1)
    expect(mockedGatsby.useStaticQuery).toHaveBeenCalledTimes(1)
  })
})
