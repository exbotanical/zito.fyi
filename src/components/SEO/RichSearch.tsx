import React from 'react';

import type {
	IRichSearchTag,
	IAbridgedPost,
	ISeoData,
	IJsonLdAuthorMetadata,
	IJsonLdOrgMetadata,
	IJsonLdPostMetadata
} from './types';
import type { IUserMetadata, IOrgMetadata } from '@/types';

interface ISeoArgs {
	orgData?: IOrgMetadata;
	postData?: IAbridgedPost;
	seoData: ISeoData;
	userData?: IUserMetadata;
}

export const getAuthorMetadata = (
	userData: IUserMetadata
): IJsonLdAuthorMetadata => ({
	'@type': 'Person',
	'address': userData.location,
	'email': userData.email,
	'familyName': userData.surname,
	'givenName': userData.firstName,
});

export const getOrgMetadata = (orgData: IOrgMetadata): IJsonLdOrgMetadata => {
	const { description, logoUrl, name, url } = orgData;

	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		description,
		'logo': logoUrl,
		name,
		url
	};
};

export const getPostMetadata = (
	postData: IAbridgedPost,
	orgData?: IOrgMetadata,
	userData?: IUserMetadata
): IJsonLdPostMetadata | null => {
	const {
		body,
		category,
		coverImageUrl,
		dateModified,
		datePublished,
		description,
		tags,
		title,
		url
	} = postData;

	const orgMetaData = orgData ? getOrgMetadata(orgData) : undefined;
	const authorData = userData ? getAuthorMetadata(userData) : undefined;

	if (!coverImageUrl || !description) return null;

	return {
		'@context': 'http://schema.org',
		'@type': 'BlogPosting',
		'articleBody': body,
		'articleSection': category,
		'author': authorData,
		'creator': authorData,
		'dateCreated': datePublished,
		dateModified,
		datePublished,
		description,
		'headline': title,
		'image': coverImageUrl,
		'keywords': tags,
		'mainEntityOfPage': 'True',
		'name': title,
		'publisher': orgMetaData,
		url
	};
};

export const RichSearchTags = ({
	seoData,
	postData,
	userData,
	orgData
}: ISeoArgs): IRichSearchTag[] => {
	const { isPost } = seoData;

	const postJsonLd =
		isPost && postData
			? getPostMetadata(postData, orgData, userData)
			: undefined;

	const orgJsonLd = orgData ? getOrgMetadata(orgData) : undefined;

	const jsonLdData = isPost ? postJsonLd : orgJsonLd;

	const richSearchTag = (
		<script key="rich-search" type="application/ld+json">
			{JSON.stringify(jsonLdData)}
		</script>
	);

	return jsonLdData ? [richSearchTag] : [];
};
