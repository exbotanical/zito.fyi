import React from 'react';

import type { ISeoData } from '@/components/SEO/types';
import type { ISiteMetadata } from '@/types';

// TODO rel canonical
export const GeneralTags = (
	seoData: ISeoData,
	siteData: ISiteMetadata
): React.ReactElement[] => {
	const { title, description, imageUrl } = seoData;
	const { logoUrl } = siteData;

	const tags = [
		<title key="z_title">{title}</title>,
		<link href={logoUrl} key="z_shortcut" rel="icon" />,
		<meta content="dark light" key="z_color_scheme" name="color-scheme" />
	];

	if (description) {
		tags.push(
			<meta content={description} key="z_description" name="description" />
		);
	}

	if (imageUrl) {
		tags.push(<meta content={imageUrl} key="z_image" name="image" />);
	}

	return tags;
};
