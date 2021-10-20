import fs from 'fs';
import path from 'path';

import { Actions } from 'gatsby';

import type { IFeedMetadata, IPost, ISiteConfig } from '../../src/types';
import { constants } from './constants';
import { withBasePath } from '.';

const FEED_COMPONENT = require.resolve('../../src/templates/feed/index.tsx');

const FEED_METADATA_DIR = `${constants.baseMetaDirectory}/${constants.feedMetaDirectory}/`;
const POSTS_PER_PAGE = constants.postsPerFeedPage;

export const resolveFeedPath = (
	config: ISiteConfig,
	feedType: string,
	feedId?: string
): string => {
	const slug =
		feedType === 'index' ? '/' : `/${feedType}${feedId ? `/${feedId}` : ''}`;

	return withBasePath(config, slug);
};

/**
 * @summary Persist Feed page metadata in the /public directory so it can later be retrieved client-side
 */
export const persistFeedMetadata = async (
	feedType: string,
	feedPageIndex: number,
	feedMetadata: IFeedMetadata,
	feedId?: string
): Promise<void> => {
	const filePath = path.join(
		FEED_METADATA_DIR,
		`${feedType}${feedId ? `-${feedId}` : ''}-${feedPageIndex}.json`
	);

	const serializedList = JSON.stringify(feedMetadata);

	await fs.promises.writeFile(filePath, serializedList);
};

export const createFeedMetadata = (
	pageIdx: number,
	pageCount: number,
	feedPosts: IPost[]
): IFeedMetadata => {
	const limit = POSTS_PER_PAGE;
	const skip = pageIdx * POSTS_PER_PAGE;

	const feedPagePosts = feedPosts.slice(skip, skip + limit);

	const nextPage = pageIdx + 1 < pageCount ? pageIdx + 1 : undefined;
	const prevPage = pageIdx > 0 ? pageIdx - 1 : undefined;

	// calculate the number of pages in the next batch
	const postsRemaining = feedPosts.length - skip - limit;
	const nextCount =
		postsRemaining > 0 ? Math.min(postsRemaining, limit) : undefined;
	const prevCount = typeof prevPage === 'number' ? limit : undefined;

	return {
		current: pageIdx,
		next: nextPage,
		nextCount,
		prev: prevPage,
		prevCount,
		posts: feedPagePosts
	};
};

export const setupFeedMetadataDir = (): void => {
	if (!fs.existsSync(FEED_METADATA_DIR)) {
		fs.mkdirSync(FEED_METADATA_DIR);
	} else {
		fs.rmSync(FEED_METADATA_DIR, { recursive: true });
		fs.mkdirSync(FEED_METADATA_DIR);
	}
};

export const createFeed = async (
	config: ISiteConfig,
	actions: Actions,
	feedPosts: IPost[],
	feedType: string,
	feedId?: string
): Promise<void> => {
	const pageCount = Math.ceil(feedPosts.length / POSTS_PER_PAGE);

	const tasks = [...Array(pageCount).keys()].map(async (pageIdx) => {
		const pageMeta = createFeedMetadata(pageIdx, pageCount, feedPosts);
		await persistFeedMetadata(feedType, pageIdx, pageMeta, feedId);

		// create an index page that resides at `<feedId>/`
		if (pageIdx === 0) {
			const path = resolveFeedPath(config, feedType, feedId);

			actions.createPage({
				path,
				component: FEED_COMPONENT,
				context: {
					pageCount,
					pageIndex: pageIdx,
					feedType,
					feedId,
					feedMetadata: pageMeta
				}
			});
		}
	});

	await Promise.all(tasks);
};