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
	seoData: ISeoData;
	postData?: IAbridgedPost;
	userData?: IUserMetadata;
	orgData?: IOrgMetadata;
}

export const getAuthorMetadata = (
	userData: IUserMetadata
): IJsonLdAuthorMetadata => ({
	'@type': 'Person',
	'givenName': userData.firstName,
	'familyName': userData.surname,
	'email': userData.email,
	'address': userData.location
});

export const getOrgMetadata = (orgData: IOrgMetadata): IJsonLdOrgMetadata => {
	const { url, logoUrl, description, name } = orgData;

	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		url,
		name,
		description,
		'logo': logoUrl
	};
};

export const getPostMetadata = (
	postData: IAbridgedPost,
	orgData?: IOrgMetadata,
	userData?: IUserMetadata
): IJsonLdPostMetadata | null => {
	const {
		title,
		description,
		coverImageUrl,
		datePublished,
		dateModified,
		category,
		tags,
		body,
		url
	} = postData;

	const orgMetaData = orgData ? getOrgMetadata(orgData) : undefined;
	const authorData = userData ? getAuthorMetadata(userData) : undefined;

	if (!coverImageUrl || !description) return null;

	return {
		'@context': 'http://schema.org',
		'@type': 'BlogPosting',
		'image': coverImageUrl,
		url,
		'headline': title,
		'name': title,
		description,
		'dateCreated': datePublished,
		datePublished,
		dateModified,
		'author': authorData,
		'creator': authorData,
		'publisher': orgMetaData,
		'mainEntityOfPage': 'True',
		'keywords': tags,
		'articleSection': category,
		'articleBody': body
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
		isPost && postData ?
			getPostMetadata(postData, orgData, userData) :
			undefined;

	const orgJsonLd = orgData ? getOrgMetadata(orgData) : undefined;

	const jsonLdData = isPost ? postJsonLd : orgJsonLd;

	const richSearchTag = (
		<script key="rich-search" type="application/ld+json">
			{JSON.stringify(jsonLdData)}
		</script>
	);

	return jsonLdData ? [richSearchTag] : [];
};
