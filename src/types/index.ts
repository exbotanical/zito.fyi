import { ImageDataLike } from 'gatsby-plugin-image';

export interface IUserQueryResult {
	site: {
		siteMetadata: {
			config: {
				user: IUserMetadata;
			};
		};
	};
}

export interface IPostBySlugQueryResult {
	mdx?: IMdxNode;
}

export interface IMdxNode {
	body?: string;
	excerpt?: string;
	timeToRead?: number;

	fields?: {
		slug?: string;
		pathName?: string;
		route?: string;
		url?: string;
	};

	frontmatter?: {
		title?: string;
		description?: string;
		cover?: {
			publicURL?: string;
			childImageSharp?: { gatsbyImageData: ImageDataLike };
		};
		coverAlt?: string;

		category?: string;
		tags?: ReadonlyArray<string | undefined>;

		datePublished?: string;
		dateModified?: string;
	};

	internal?: {
		content?: string;
	};
}

export interface IPost {
	title: string;

	description?: string;
	coverImg?: ImageDataLike;
	coverImageUrl?: string;
	coverImageAlt: string;

	datePublished: Date;
	dateModified: Date;

	category?: string;
	tags?: string[];

	body?: string;
	excerpt?: string;
	timeToRead: number;
	internalContent?: string;

	slug: string;
	route: string;
	pathName: string;
	url: string;

	relatedPosts?: IPost[];
}

export interface IPostJson {
	title: string;

	description?: string;
	coverImg: ImageDataLike;
	coverImageUrl?: string;
	coverImageAlt: string;

	datePublished: string;
	dateModified: string;

	category?: string;
	tags?: string[];

	excerpt?: string;
	timeToRead: number;

	slug: string;
	route: string;
	pathName: string;
	url: string;

	relatedPosts?: IPostJson[];
}

export interface IFeedMetadata {
	current: number;
	next?: number;
	nextCount?: number;
	prev?: number;
	prevCount?: number;
	posts: IPost[];
}

export type IFeedMetadataJson = {
	current: number;
	next?: number;
	nextCount?: number;
	prev?: number;
	prevCount?: number;
	posts: IPostJson[];
};

export type IPlaceholderPost = {
	isPlaceholder: boolean;
	key: string;
};

export type IFeedItems = (IPost | IPlaceholderPost)[];

export interface ISiteMetadata {
	title: string;
	titleAbridged: string;
	name: string;
	description: string;
	language: string;
	logoUrl: string;
	facebookAppId?: string;
	twitterHandle?: string;
	url: string;
	copyright: string;
	rss: string;
	rssTitle: string;
	googleAnalyticsId?: string;
	disqusShortname?: string;
	themeColor: string;
	backgroundColor: string;
}

export interface IUserMetadata {
	id: string;
	firstName: string;
	surname: string;
	twitterHandle?: string;
	linkedIn?: string;
	github?: string;
	email: string;
	location: string;
	about: string;
	avatar: string;
}

export interface IOrgMetadata {
	name: string;
	description: string;
	logoUrl: string;
	url: string;
}

interface IIconManifest {
	src: string;
	sizes: string;
	type: string;
	purpose?: string;
}

export interface ISiteConfig {
	site: ISiteMetadata;
	user: IUserMetadata;
	organization: IOrgMetadata;

	pathPrefix: string;

	contentDir?: string;
	assetDir?: string;

	embeddedImageWidth: number;
	embeddedVideoWidth: number;

	iconPath?: string;
	iconList: Readonly<IIconManifest[]>;
	iconCachePaths?: string[];

	basePath?: string;
}

export type IQueryAllPostsResult = {
	allMdx: {
		edges: { node: IMdxNode }[];
	};
};
