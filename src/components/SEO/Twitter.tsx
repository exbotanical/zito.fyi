import React from 'react';

import type { UserMetadata, BaseSiteMetadata } from '@/types';
import type { SeoData, TwitterTagList } from './types';

interface SeoArgs {
	seoData: SeoData;
	userData?: UserMetadata;
	siteData: BaseSiteMetadata;
}

export const TwitterTags = ({
	seoData,
	userData,
	siteData
}: SeoArgs): TwitterTagList => {
	const { title, description, imageUrl, imageAlt } = seoData;
	const usertwitterHandle = userData?.twitterHandle;
	const sitetwitterHandle = siteData.twitterHandle;

	const tagList: TwitterTagList = [];

	const addTypeSafeTag = (name: string, content: string) => {
		tagList.push(<meta content={content} name={name} />);
	};

	addTypeSafeTag('twitter:card', 'summary_large_image');
	addTypeSafeTag('twitter:title', title);

	if (description) addTypeSafeTag('twitter:description', description);

	if (imageUrl) addTypeSafeTag('twitter:image', imageUrl);

	addTypeSafeTag('twitter:image:alt', imageAlt);

	if (usertwitterHandle) addTypeSafeTag('twitter:creator', usertwitterHandle);

	if (sitetwitterHandle) addTypeSafeTag('twitter:site', sitetwitterHandle);

	return tagList.map((tag) => ({
		...tag,
		key: tag.props.name
	}));
};
