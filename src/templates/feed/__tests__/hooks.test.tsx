import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/dom';
import fetchMock from 'fetch-mock';
import { mocked } from 'ts-jest/utils';

import { useInfiniteFeed } from '../hooks';

import Index0 from '../../../../__tests__/fixtures/feedMetadata/index-0.json';
import Index1 from '../../../../__tests__/fixtures/feedMetadata/index-1.json';
import Index2 from '../../../../__tests__/fixtures/feedMetadata/index-2.json';
import { config } from '../../../../__tests__/fixtures';

import type {
	IFeedItems,
	IFeedMetadataJson,
	IPost,
	IPlaceholderPost
} from '../../../types';
import type { IPageContext } from '../types';

const pageMetadatas: IFeedMetadataJson[] = [
	Index0 as unknown as IFeedMetadataJson,
	Index1 as unknown as IFeedMetadataJson,
	Index2 as unknown as IFeedMetadataJson
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
		if (!pageData) {
			throw Error(`Requested page with id ${pageId} does not exist`);
		}

		return { body: pageData, status: 200 };
	});
};

const pageCtx: IPageContext = {
	feedId: undefined,
	feedMetadata: Index0 as unknown as IFeedMetadataJson,
	feedType: 'index',
	pageCount: 3,
	pageIndex: 0
};

const isPostPlaceholder = (
	post: IPost | IPlaceholderPost
): post is IPlaceholderPost =>
	(post as IPlaceholderPost).isPlaceholder === true;

const filterPlaceholders = (feedPosts: IFeedItems) =>
	feedPosts.filter(isPostPlaceholder);

const filterFullPosts = (feedPosts: IFeedItems) =>
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
