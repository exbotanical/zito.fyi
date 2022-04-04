import type React from 'react';

import isObject from 'lodash.isobject';

import type { UserMetadata, BaseSiteMetadata, OrgMetadata } from '@/types';
import type { SeoData, AbridgedPost } from '../types';

// recursively scan for nullish values
export const containsEmptyValues = (data: unknown): boolean => {
	if (Array.isArray(data)) {
		return !!data.find((item) => containsEmptyValues(item));
	}

	if (isObject(data)) {
		return containsEmptyValues(Object.values(data));
	}

	return !data;
};

export const tagListHasEmptyValues = (tagList: React.ReactElement[]): boolean =>
	!!tagList.find((tag) => {
		return containsEmptyValues(tag.type) || containsEmptyValues(tag.props);
	});

export const tagListHasUniqueKeys = (
	tagList: React.ReactElement[]
): boolean => {
	const keys = tagList.map((tag) => tag.key);

	return new Set(keys).size === keys.length;
};

// TODO deduplicate
export const seoData: {
	organization: OrgMetadata;
	post: AbridgedPost;
	seoPost: SeoData;
	seoSite: SeoData;
	site: BaseSiteMetadata;
	user: UserMetadata;
} = {
	organization: {
		description: '',
		logoUrl: '',
		name: '',
		url: 'https://zito.dev'
	},
	post: {
		body: 'Post body',
		category: 'Tech',
		coverImageAlt: 'Post cover image alt text.',
		coverImageUrl: '/logos/logo-1024.png',
		dateModified: new Date('2021-12-20T00:00:00.000+00:00'),
		datePublished: new Date('2021-12-17T00:00:00.000+00:00'),
		description: 'Post description.',
		tags: ['Tag1', 'Tag2'],
		title: 'Post title',
		url: '/posts/url'
	},
	seoPost: {
		description: 'Post description.',
		imageAlt: 'Post cover image alt text.',
		imageUrl: '/logos/logo-1024.png',
		isPost: true,
		title: 'Post title',
		type: 'post',
		url: '/posts/url'
	},
	seoSite: {
		description: 'Site description.',
		imageAlt: 'Site image alt description.',
		imageUrl: '/logos/logo-1024.png',
		isPost: false,
		title: 'Site title',
		type: 'page',
		url: '/url'
	},
	site: {
		backgroundColor: '#F7F7F7',
		copyright: '© Copyright 2021 | Matthew Zito',
		description: "Matthew Zito's Blog About Software and Programming",
		facebookAppId: '',
		googleAnalyticsId: '',
		language: 'en',
		logoUrl: '',
		name: "Matthew Zito's Blog",
		rss: '/rss.xml',
		rssTitle: "Matthew Zito's Blog RSS Feed",
		themeColor: '#9AACFF',
		title: "Matthew Zito's Blog",
		titleAbridged: "Zito's Blog",
		twitterHandle: 'test',
		url: 'https://zito.dev'
	},
	user: {
		about: 'A paragraph about me, the author and site admin.',
		avatar:
			'https://upload.wikimedia.org/wikipedia/en/e/e7/CanMonsterMovieAlbumCover.jpg',

		email: 'exbotanical@gmail.com',
		firstName: 'Matthew',
		github: 'MatthewZito',
		id: 'goldmund',
		linkedIn: 'matthew-zito-9a03b3127',
		location: 'United States',
		surname: 'Zito',
		twitterHandle: 'test'
	}
};
