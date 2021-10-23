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
		<title key="z_title">{title}</title>,
		<link rel="shortcut icon" href={logoUrl} key="z_shortcut" />,
		<meta name="color-scheme" content="dark light" key="z_color_scheme" />
	];

	if (description) {
		tags.push(
			<meta name="description" content={description} key="z_description" />
		);
	}

	if (imageUrl) {
		tags.push(<meta name="image" content={imageUrl} key="z_image" />);
	}

	return tags;
};
