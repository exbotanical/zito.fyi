import React from 'react';

export interface ISeoData {
	isPost: boolean;
	type: 'page' | 'post';
	title: string;
	imageUrl?: string;
	imageAlt: string;
	url: string;
	description?: string;
}

export interface IAbridgedPost {
	title: string;
	description?: string;
	coverImageUrl?: string;
	coverImageAlt: string;
	datePublished: Date;
	dateModified: Date;
	category: string;
	tags: string[];
	body: string;
	url: string;
}

export interface IJsonLdAuthorMetadata {
	'@type': 'Person';
	'givenName': string;
	'familyName': string;
	'email': string;
	'address': string;
}

export interface IJsonLdOrgMetadata {
	'@context': 'https://schema.org';
	'@type': 'Organization';
	'url': string;
	'name': string;
	'description': string;
	'logo': string;
}

export interface IJsonLdPostMetadata {
	'@context': 'http://schema.org';
	'@type': 'BlogPosting';
	'mainEntityOfPage': 'True';
	'image': string;
	'url': string;
	'headline': string;
	'name': string;
	'description': string;
	'dateCreated': Date;
	'datePublished': Date;
	'dateModified': Date;
	'author'?: IJsonLdAuthorMetadata;
	'creator'?: IJsonLdAuthorMetadata;
	'publisher'?: IJsonLdOrgMetadata;
	'keywords': string[];
	'articleSection': string;
	'articleBody': string;
}

export type ITwitterTagList = React.ReactElement<
{ name: string; content: string },
'meta'
>[];

export type IOpenGraphTagList = React.ReactElement<
{ property: string; content: string },
'meta'
>[];

export type IRichSearchTag = React.ReactElement<
{ key: 'rich-search'; type: 'application/ld+json' },
'script'
>;
