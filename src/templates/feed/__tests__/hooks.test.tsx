import { renderHook, act, fireEvent, waitFor } from '@testing-library/react'
import fetchMock from 'fetch-mock'
import { mocked } from 'jest-mock'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import type {
  FeedItems,
  FeedMetadataJson,
  PlaceholderPost,
  Post,
} from '@/types'

import { config } from '@@/fixtures'
import Index0 from '@@/fixtures/feedMetadata/index-0.json'
import Index1 from '@@/fixtures/feedMetadata/index-1.json'
import Index2 from '@@/fixtures/feedMetadata/index-2.json'

import { useInfiniteFeed } from '../hooks'

import type { PageContext } from '../types'

const pageMetadatas: FeedMetadataJson[] = [
  Index0 as unknown as FeedMetadataJson,
  Index1 as unknown as FeedMetadataJson,
  Index2 as unknown as FeedMetadataJson,
]

jest.mock('react', () => {
  const actualReact = jest.requireActual<typeof import('react')>('react')
  const useRef = jest.fn().mockImplementation(() => ({
    current: {
      getBoundingClientRect: () => ({
        bottom: 9999,
        top: 0,
      }),
    },
  }))

  return {
    ...actualReact,
    useRef,
  }
})

jest.mock('@/config/useConfig', () => ({
  useConfig: jest.fn(() => config),
}))

const mockedReact = mocked(React, { shallow: true })

const queryClient = new QueryClient()
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

function mockFetch() {
  fetchMock.mock(/\/feed_meta\/index-(.+).json/, url => {
    const idMatches = /index-(.+).json/.exec(url)
    const pageId = idMatches ? idMatches[1] : undefined

    if (!pageId) {
      throw Error('The provided page is missing an index')
    }

    const pageData = pageMetadatas[parseInt(pageId, 10)]

    return { body: pageData, status: 200 }
  })
}

const isPostPlaceholder = (
  post: PlaceholderPost | Post,
): post is PlaceholderPost => (post as PlaceholderPost).isPlaceholder

// const filterPlaceholders = (feedPosts: FeedItems) =>
//   feedPosts.filter(isPostPlaceholder)

const filterFullPosts = (feedPosts: FeedItems) =>
  feedPosts.filter(post => !isPostPlaceholder(post))

const pageCtx: PageContext = {
  feedId: undefined,
  feedMetadata: Index0 as unknown as FeedMetadataJson,
  feedType: 'index',
  pageCount: 3,
  pageIndex: 0,
}

describe('hook `useInfiniteFeed`', () => {
  beforeAll(mockFetch)

  it('loads only a single page on initial render', async () => {
    const { feedItems } = (
      await act(
        () => renderHook(() => useInfiniteFeed(pageCtx), { wrapper }).result,
      )
    ).current

    expect(feedItems.length).toEqual(5)
  })

  it('loads next page on scroll', async () => {
    const { result } = await act(() =>
      renderHook(() => useInfiniteFeed(pageCtx), { wrapper }),
    )

    await waitFor(() => {
      expect(result.current.feedItems.length).toEqual(5)
    })

    const loadNext = async (targetCount: number) => {
      act(() => {
        // FIXME: Trick the DOM into thinking we have more scrolling to do
        window.innerHeight = 10000

        fireEvent.scroll(window, {
          target: {
            y: 5000,
          },
        })
      })

      await waitFor(() => {
        expect(result.current.feedItems.length).toEqual(targetCount)
      })

      await waitFor(() => {
        expect(filterFullPosts(result.current.feedItems).length).toEqual(
          targetCount,
        )
      })

      const fullPosts = filterFullPosts(result.current.feedItems)
      expect(fullPosts).toHaveLength(targetCount)

      expect(fullPosts).toMatchSnapshot()
    }

    // Also, because React 18 is fucking retarded, useEffect now runs twice.
    // Ideally, we'd call this twice with 10 and 15 but React's dumbass takes us straight to 15.
    await loadNext(15)
  })

  // test with full visibility i.e. no need to scroll
  it('loads feed pages upon initial load without waiting for a scroll event', async () => {
    mockedReact.useRef.mockImplementation(() => ({
      current: {
        getBoundingClientRect: () => ({
          bottom: 1,
          top: 0,
        }),
      },
    }))

    const { feedItems } = (
      await act(
        () => renderHook(() => useInfiniteFeed(pageCtx), { wrapper }).result,
      )
    ).current

    expect(feedItems.length).toBeGreaterThan(10)
  })
})
