import { isObject } from 'lodash';
import React from 'react';

import type {
	IUserMetadata,
	ISiteMetadata,
	IOrgMetadata
} from '../../../types';
import type { ISeoData, IAbridgedPost } from '../types';

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
export const sampleSeoData: {
	post: IAbridgedPost;
	seoPost: ISeoData;
	seoSite: ISeoData;
	site: ISiteMetadata;
	user: IUserMetadata;
	organization: IOrgMetadata;
} = {
	post: {
		title: 'Post title',
		description: 'Post description.',
		coverImageUrl: '/logos/logo-1024.png',
		coverImageAlt: 'Post cover image alt text.',
		datePublished: new Date('2021-12-17T00:00:00.000+00:00'),
		dateModified: new Date('2021-12-20T00:00:00.000+00:00'),
		category: 'Tech',
		tags: ['Tag1', 'Tag2'],
		body: 'Post body',
		url: '/posts/url'
	},
	seoPost: {
		isPost: true,
		type: 'post',
		title: 'Post title',
		imageUrl: '/logos/logo-1024.png',
		imageAlt: 'Post cover image alt text.',
		url: '/posts/url',
		description: 'Post description.'
	},
	seoSite: {
		isPost: false,
		type: 'page',
		title: 'Site title',
		imageUrl: '/logos/logo-1024.png',
		imageAlt: 'Site image alt description.',
		url: '/url',
		description: 'Site description.'
	},
	site: {
		title: 'Matthew Zito\'s Blog',
		titleAbridged: 'Zito\'s Blog',
		name: 'Matthew Zito\'s Blog',
		description: 'Matthew Zito\'s Blog About Software and Programming',
		language: 'en',
		logoUrl: '',
		facebookAppId: '',
		twitterHandle: 'test',
		url: 'https://zito.dev',
		rss: '/rss.xml',
		rssTitle: 'Matthew Zito\'s Blog RSS Feed',
		googleAnalyticsId: '',
		copyright: '© Copyright 2021 | Matthew Zito',
		themeColor: '#D83850',
		backgroundColor: '#F7F7F7'
	},
	user: {
		id: 'goldmund',
		firstName: 'Matthew',
		surname: 'Zito',
		twitterHandle: 'test',
		linkedIn: 'matthew-zito-9a03b3127',
		github: 'MatthewZito',
		email: 'exbotanical@gmail.com',
		location: 'United States',
		about: 'A paragraph about me, the author and site admin.',
		avatar: 'https://i.ibb.co/LNJDFXV/self.png'
	},
	organization: {
		name: '',
		description: '',
		logoUrl: '',
		url: 'https://zito.dev' // URL of the organization site
	}
};
