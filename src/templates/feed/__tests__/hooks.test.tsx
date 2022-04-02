import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock';
import { mocked } from 'jest-mock';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { config } from '../../../../test/fixtures';
import Index0 from '../../../../test/fixtures/feedMetadata/index-0.json';
import Index1 from '../../../../test/fixtures/feedMetadata/index-1.json';
import Index2 from '../../../../test/fixtures/feedMetadata/index-2.json';
import { useInfiniteFeed } from '../hooks';

import type {
	FeedItems,
	FeedMetadataJson,
	Post,
	PlaceholderPost
} from '../../../types';
import type { PageContext } from '../types';

const pageMetadatas: FeedMetadataJson[] = [
	Index0 as unknown as FeedMetadataJson,
	Index1 as unknown as FeedMetadataJson,
	Index2 as unknown as FeedMetadataJson
];

jest.mock('react', () => {
	const actualReact = jest.requireActual<typeof import('react')>('react');
	const useRef = jest.fn().mockImplementation(() => ({
		current: {
			getBoundingClientRect: () => ({
				bottom: 9999,
				top: 0
			})
		}
	}));

	return {
		...actualReact,
		useRef
	};
});

jest.mock('../../../config/useConfig', () => ({
	useConfig: jest.fn(() => config)
}));

const mockedReact = mocked(React, true);

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactChildren }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockFetch = () => {
	fetchMock.mock(/\/feed_meta\/index-(.+).json/, (url) => {
		const idMatches = /index-(.+).json/.exec(url);
		const pageId = idMatches ? idMatches[1] : undefined;

		if (!pageId) {
			throw Error('The provided page is without an index');
		}

		const pageData = pageMetadatas[parseInt(pageId, 10)];

		return { body: pageData, status: 200 };
	});
};

const pageCtx: PageContext = {
	feedId: undefined,
	feedMetadata: Index0 as unknown as FeedMetadataJson,
	feedType: 'index',
	pageCount: 3,
	pageIndex: 0
};

const isPostPlaceholder = (
	post: PlaceholderPost | Post
): post is PlaceholderPost => (post as PlaceholderPost).isPlaceholder;

const filterPlaceholders = (feedPosts: FeedItems) =>
	feedPosts.filter(isPostPlaceholder);

const filterFullPosts = (feedPosts: FeedItems) =>
	feedPosts.filter((post) => !isPostPlaceholder(post));

describe('hook `useInfiniteFeed`', () => {
	beforeAll(mockFetch);

	it('loads next page on scroll', async () => {
		await act(async () => {
			const { result, waitFor } = renderHook(() => useInfiniteFeed(pageCtx), {
				wrapper
			});

			// initial load
			await waitFor(() => result.current.feedItems.length === 5);

			mockedReact.useRef.mockImplementation(() => ({
				current: {
					getBoundingClientRect: () => ({
						bottom: 1,
						top: 0
					})
				}
			}));

			const loadNext = async (targetCount: number) => {
				fireEvent.scroll(window, { target: {} }); // scroll

				await waitFor(() => result.current.feedItems.length === targetCount); // wait for updated list

				const placeholders = filterPlaceholders(result.current.feedItems);
				expect(placeholders).toHaveLength(5);

				await waitFor(
					() => filterFullPosts(result.current.feedItems).length === targetCount
				);

				const fullPosts = filterFullPosts(result.current.feedItems);
				expect(fullPosts).toHaveLength(targetCount);

				expect(fullPosts).toMatchSnapshot();
			};

			await loadNext(10);

			await loadNext(15);
		});
	});

	// test with full visibility i.e. no need to scroll
	it('loads feed pages upon initial load without waiting for a scroll event', async () => {
		mockedReact.useRef.mockImplementation(() => ({
			current: {
				getBoundingClientRect: () => ({
					bottom: 1,
					top: 0
				})
			}
		}));

		await act(async () => {
			const { result, waitFor } = renderHook(() => useInfiniteFeed(pageCtx), {
				wrapper
			});

			await waitFor(() => filterFullPosts(result.current.feedItems).length > 5);

			expect(result.current.feedItems.length).toBeGreaterThan(10);
		});
	});
});
