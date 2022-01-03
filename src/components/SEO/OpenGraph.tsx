import React from 'react';

import type { IAbridgedPost, ISeoData, IOpenGraphTagList } from './types';
import type { IUserMetadata, ISiteMetadata } from '@/types';

interface ISeoArgs {
	seoData: ISeoData;
	siteData: ISiteMetadata;
	userData?: IUserMetadata;
	postData?: IAbridgedPost;
}

const addTypeSafeTag = (
	tagList: IOpenGraphTagList,
	property: string,
	content: string
) => {
	tagList.push(<meta content={content} property={property} />);
};

const createPostTagList = (
	postData: IAbridgedPost,
	userData?: IUserMetadata
): IOpenGraphTagList => {
	const metaTags: IOpenGraphTagList = [];

	addTypeSafeTag(
		metaTags,
		'article:published_time',
		postData.datePublished.toISOString()
	);
	addTypeSafeTag(
		metaTags,
		'article:modified_time',
		postData.dateModified.toISOString()
	);
	addTypeSafeTag(
		metaTags,
		'article:author',
		'http://examples.opengraphprotocol.us/profile.html'
	);

	if (userData) {
		addTypeSafeTag(metaTags, 'profile:first_name', userData.firstName);
		addTypeSafeTag(metaTags, 'profile:last_name', userData.surname);
		addTypeSafeTag(metaTags, 'profile:username', userData.id);
	}

	addTypeSafeTag(metaTags, 'article:section', postData.category);

	postData.tags.forEach((tag) => {
		addTypeSafeTag(metaTags, 'article:tag', tag);
	});

	return metaTags;
};

export const OpenGraphTags = ({
	seoData,
	siteData,
	userData,
	postData
}: ISeoArgs): IOpenGraphTagList => {
	const { isPost, type, title, imageUrl, imageAlt, url, description } = seoData;

	const siteName = siteData.name;

	if (!imageUrl || !imageAlt) return [];

	const metaTags: IOpenGraphTagList = [];

	addTypeSafeTag(metaTags, 'og:title', title);
	addTypeSafeTag(metaTags, 'og:type', type);
	addTypeSafeTag(metaTags, 'og:url', url);
	addTypeSafeTag(metaTags, 'og:image', imageUrl);
	addTypeSafeTag(metaTags, 'og:image:alt', imageAlt);
	addTypeSafeTag(metaTags, 'og:site_name', siteName);

	if (description) {
		addTypeSafeTag(metaTags, 'og:description', description);
	}

	if (siteData.facebookAppId) {
		addTypeSafeTag(metaTags, 'fb:app_id', siteData.facebookAppId);
	}

	if (isPost && postData) {
		metaTags.push(...createPostTagList(postData, userData));
	}

	// return w/ unique keys
	return metaTags.map((tag) => ({
		...tag,
		key: `${tag.props.property}-${tag.props.content}`
	}));
};
