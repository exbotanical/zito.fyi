export interface IGetMdxPostsQueryResult {
	allMdx: {
		edges: {
			node: {
				fields?: { slug?: string };
				frontmatter?: {
					title?: string;
					category?: string;
					tags?: string[];
					datePublished?: string;
				};
			};
		}[];
	};
}

export interface IBaseFrontmatter {
	title?: string;
	slug?: string;
}

export interface IRssFeedMetadata {
	site_url?: string;
	feed_url?: string;
	title?: string;
	description?: string;
	image_url?: string;
	copyright?: string;
	generator?: string;
}

export interface IRssFeedQueryResult {
	siteMetadata?: {
		rssMetadata?: IRssFeedMetadata;
	};
}

export interface IMdxFeedQueryResult {
	edges?: [
		{
			node: {
				excerpt?: string;
				html?: string;
				timeToRead?: string;
				fields?: {
					slug?: string;
				};
				frontmatter?: {
					title?: string;
					cover?: string;
					datePublished?: string;
					category?: string;
					tags?: string;
				};
			};
		}
	];
}

export interface IFeedQueryResult {
	site?: IRssFeedQueryResult;
	allMdx?: IMdxFeedQueryResult;
}

export interface IFeedConfig {
	serialize: (
		data: IFeedPluginData
	) => (IFeedPluginItem | undefined)[] | undefined;
	query: string;
	output: string;
	title: string;
	site_url: string;
}

export interface IFeedPluginData {
	generator: string;
	query: IFeedQueryResult;
	feeds: IFeedConfig[];
	plugins: [];
	output: string;
	title: string;
	site_url: string;
}

export interface IFeedPluginItem {
	categories?: string;
	date?: string;
	title?: string;
	description?: string;
	url?: string;
	guid?: string;
	custom_elements: [{ 'content:encoded'?: string }, { author?: string }];
}
