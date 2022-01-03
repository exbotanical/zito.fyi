import React from 'react';

import type { IUserMetadata, ISiteMetadata } from '../../types';
import type { ISeoData, ITwitterTagList } from './types';

interface SeoArgs {
	seoData: ISeoData;
	userData?: IUserMetadata;
	siteData: ISiteMetadata;
}

export const TwitterTags = ({
	seoData,
	userData,
	siteData
}: SeoArgs): ITwitterTagList => {
	const { title, description, imageUrl, imageAlt } = seoData;
	const usertwitterHandle = userData?.twitterHandle;
	const sitetwitterHandle = siteData.twitterHandle;

	const tagList: ITwitterTagList = [];

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
