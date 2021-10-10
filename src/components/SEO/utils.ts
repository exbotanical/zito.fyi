import removeMd from 'remove-markdown';

import type { ISeoData, IAbridgedPost } from './types';
import type { IPost, ISiteMetadata } from '@/types';

/**
 * @summary Generate abridged post data from a given `allMdx` edge
 */
export const generatePostData = (post: IPost): IAbridgedPost => {
	const {
		coverImageUrl,
		coverImageAlt,
		datePublished,
		dateModified,
		description,
		title,
		category,
		tags,
		internalContent,
		excerpt
	} = post;

	if (!internalContent) {
		throw Error(
			'[generatePostData] Post does not contain internal content necessary for Rich Tags.'
		);
	}

	const body = removeMd(internalContent);

	return {
		title,
		description: description || excerpt,
		coverImageUrl,
		coverImageAlt,
		datePublished,
		dateModified,
		category: category || 'None',
		tags: tags || [],
		body,
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
	const description = postData ?
		postData.description :
		siteMetadata.description;

	return {
		isPost,
		type,
		title,
		imageUrl,
		imageAlt,
		url,
		description
	};
};
