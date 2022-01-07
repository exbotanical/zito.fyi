import type { FeedMetadataJson } from '../../types';

export interface PageContext {
	pageCount: number;
	pageIndex: number;
	feedType: string;
	feedId?: string;
	feedMetadata: FeedMetadataJson;
}
