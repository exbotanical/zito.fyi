import React from 'react';

import type { ISiteMetadata } from '@/types';
import type { ISeoData } from '@/components/SEO/types';

// TODO rel canonical
export const GeneralTags = (
	seoData: ISeoData,
	siteData: ISiteMetadata
): React.ReactElement[] => {
	const { title, description, imageUrl } = seoData;
	const { logoUrl } = siteData;

	const tags = [
		<title key="gen-title">{title}</title>,
		<link rel="shortcut icon" href={logoUrl} key="gen-fav" />
	];

	if (description) {
		tags.push(<meta name="description" content={description} key="gen-desc" />);
	}

	if (imageUrl) {
		tags.push(<meta name="image" content={imageUrl} key="gen-image" />);
	}

	return tags;
};
