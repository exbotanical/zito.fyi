import removeMd from 'remove-markdown';

import type { ISeoData, IAbridgedPost } from './types';
import type { IPost, ISiteMetadata } from '@/types';

/**
 * @summary Generate abridged post data from a given `allMdx` edge
 */
export const generatePostData = (post: IPost): IAbridgedPost => {
	const {
		category,
		coverImageAlt,
		coverImageUrl,
		dateModified,
		datePublished,
		description,
		excerpt,
		internalContent,
		tags,
		title
	} = post;

	if (!internalContent) {
		throw Error(
			'[generatePostData] Post does not contain internal content necessary for Rich Tags.'
		);
	}

	const body = removeMd(internalContent);

	return {
		body,
		category: category || 'None',
		coverImageAlt,
		coverImageUrl,
		dateModified,
		datePublished,
		description: description || excerpt,
		tags: tags || [],
		title,
		url: post.url
	};
};

/**
 * @summary Generate SEO metadata
 */
export const generateSeoData = (
	siteMetadata: ISiteMetadata,
	postData?: IAbridgedPost
): ISeoData => {
	const isPost = !!postData;
	const title = postData ? postData.title : siteMetadata.title;
	const type = postData ? 'post' : 'page';
	const imageUrl = postData ? postData.coverImageUrl : siteMetadata.logoUrl;
	const imageAlt = postData ? postData.coverImageAlt : siteMetadata.description;
	const url = postData ? postData.url : siteMetadata.url;
	const description = postData
		? postData.description
		: siteMetadata.description;

	return {
		description,
		imageAlt,
		imageUrl,
		isPost,
		title,
		type,
		url
	};
};
