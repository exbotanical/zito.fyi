import { useEffect, useRef, useMemo } from 'react';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { constants } from '../../../config';
import type { IPageContext } from './types';
import { useConfig } from '@/config';
import { jsonToPost } from '@/utils';

import type {
	IFeedMetadataJson,
	IPostJson,
	IFeedItems,
	IPlaceholderPost,
	ISiteConfig
} from '@/types';

/**
 * @summary Calculate the base URL for a given feed
 */
const resolveBaseUrl = (
	pageContext: IPageContext,
	config: ISiteConfig
): string =>
	`${config.pathPrefix}${constants.feedMetaDirectory}/${pageContext.feedType}${
		pageContext.feedId ? `-${pageContext.feedId}` : ''
	}`;

/**
 * @summary Generate a fetch handler for use by a feed
 */
const generateFetchHandler =
	(baseUrl: string) =>
		async ({ pageParam = 0 }): Promise<IFeedMetadataJson> => {
		// kind of a hack but w/e, it's what Gatsby is doing under the hood
			const response = await fetch(`${baseUrl}-${pageParam}.json`);

			if (!response.ok) {
				throw new Error(`Failed to fetch ${baseUrl}-${pageParam}.json`);
			}

			return response.json() as Promise<IFeedMetadataJson>;
		};

/**
 * @summary Generate placeholders for currently loading posts
 */
const generatePostPlaceholders = (
	keyPrefix: string,
	count?: number
): IPlaceholderPost[] =>
	Array(count || constants.postsPerFeedPage)
		.fill(0)
		.map((_, idx) => ({
			isPlaceholder: true,
			key: `${keyPrefix}-${idx}`
		}));

/**
 * @summary Coordinate page-fetching to the user's scroll position.
 * Effectively an infinite scroll utility
 */
const useScrollContingentFetch = (
	feedQuery: UseInfiniteQueryResult
): React.RefObject<HTMLDivElement> => {
	// ref to the feed wrapper el; tracks scroll progress
	const feedElementRef = useRef<HTMLDivElement>(null);

	// Helpers for loading pages
	const loadNext = async () => {
		if (
			feedQuery.hasNextPage &&
			!feedQuery.isFetchingNextPage &&
			!feedQuery.error
		) {
			await feedQuery.fetchNextPage();
		}
	};

	const checkScrollState = async () => {
		if (feedElementRef.current) {
			if (
				feedElementRef.current.getBoundingClientRect().bottom <=
				window.innerHeight
			) {
				await loadNext();
			}
		}
	};

	useEffect(() => {
		const onScroll = async (): Promise<void> => {
			await checkScrollState();
		};

		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});

	// check state on rerenders to prevent edge cases
	// e.g. scrollbar is not extant but all data is loaded
	checkScrollState();

	return feedElementRef;
};

/**
 * @summary Provides an infinite-scroll capable feed
 */
export const useInfiniteFeed = (
	pageContext: IPageContext
): {
	feedElementRef: React.RefObject<HTMLDivElement>;
	feedItems: IFeedItems;
} => {
	const config = useConfig();

	const baseUrl = resolveBaseUrl(pageContext, config);

	const feedQuery = useInfiniteQuery(
		[pageContext.feedType, pageContext.feedId],
		generateFetchHandler(baseUrl),
		{
			getNextPageParam: (lastPage) => lastPage.next,
			// Set the initial page data supplied by the page context
			initialData: {
				pages: [pageContext.feedMetadata],
				pageParams: [pageContext.pageIndex]
			}
		}
	);

	const feedElementRef = useScrollContingentFetch(feedQuery);

	const feedItems = useMemo(() => {
		const jsonPostList: IPostJson[] =
			feedQuery?.data?.pages.map((page) => page.posts).flat() ||
			pageContext.feedMetadata.posts;

		const list: IFeedItems = jsonPostList.map(jsonToPost);

		// when loading the next page, we want to show placeholder posts
		if (feedQuery.isFetchingNextPage) {
			const lastPage = feedQuery.data?.pages[feedQuery.data?.pages.length - 1];
			list.push(...generatePostPlaceholders('next', lastPage?.nextCount));
		}

		return list;
	}, [
		feedQuery.data,
		pageContext.feedMetadata.posts,
		feedQuery.isFetchingNextPage
	]);

	return {
		feedElementRef,
		feedItems
	};
};