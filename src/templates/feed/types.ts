import type { IFeedMetadataJson } from '../../types';

export interface IPageContext {
	pageCount: number;
	pageIndex: number;
	feedType: string;
	feedId?: string;
	feedMetadata: IFeedMetadataJson;
}
