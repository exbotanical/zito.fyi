import { IGetMdxPostsQueryResult } from 'config/utils/types';
import type {
	IMdxNode,
	IPost,
	IPostJson,
	IPostBySlugQueryResult,
	IUserQueryResult,
	IUserMetadata
} from '@/types';

export function mdxNodeToPost (mdxNode: IMdxNode): IPost {
	const { frontmatter } = mdxNode;

	if (!frontmatter) {
		throw Error(
			`[mdxNodeToPost] Post missing frontmatter. Post slug: ${
				mdxNode.fields?.slug || 'was not provided'
			}.`
		);
	}

	if (!frontmatter.title) {
		throw Error(
			`[mdxNodeToPost] Post missing title. Post slug: ${
				mdxNode.fields?.slug || 'was not provided'
			}.`
		);
	}

	if (!frontmatter.datePublished) {
		throw Error(
			`[mdxNodeToPost] Post missing publication date. Post slug: ${
				mdxNode.fields?.slug || 'was not provided'
			}.`
		);
	}

	if (!mdxNode.fields) {
		throw Error(
			`[mdxNodeToPost] Post missing fields. Post title: ${frontmatter.title}.`
		);
	}

	if (!mdxNode.fields.slug) {
		throw Error(
			`[mdxNodeToPost] Post missing slug. Post title: ${frontmatter.title}.`
		);
	}

	if (!mdxNode.fields.pathName) {
		throw Error(
			`[mdxNodeToPost] Post missing pathName. Post slug: ${mdxNode.fields.slug}.`
		);
	}

	if (!mdxNode.fields.url) {
		throw Error(
			`[mdxNodeToPost] Post missing url. Post slug: ${mdxNode.fields.slug}.`
		);
	}

	if (!mdxNode.fields.route) {
		throw Error(
			`[mdxNodeToPost] Post missing route. Post slug: ${mdxNode.fields.slug}.`
		);
	}

	if (!mdxNode.timeToRead) {
		throw Error(
			`[mdxNodeToPost] Post missing timeToRead. Post slug: ${mdxNode.fields.slug}.`
		);
	}

	if (!frontmatter.cover) {
		throw Error(
			`[mdxNodeToPost] Post missing cover image. Post slug: ${
				mdxNode.fields?.slug || 'was not provided'
			}.`
		);
	}

	if (!frontmatter.coverAlt) {
		throw Error(
			`[mdxNodeToPost] Post missing cover alt. Post slug: ${
				mdxNode.fields?.slug || 'was not provided'
			}.`
		);
	}

	if (!frontmatter.description) {
		console.warn(
			`[mdxNodeToPost] Post missing description. Post slug: ${
				mdxNode.fields?.slug || 'was not provided'
			}. `
		);
	}

	const tagsFilter = (tag: string | undefined): tag is string =>
		typeof tag !== 'undefined';
	const tagList = frontmatter.tags ? frontmatter.tags.filter(tagsFilter) : [];

	return {
		title: frontmatter.title,

		description: frontmatter.description,
		coverImg: frontmatter.cover.childImageSharp?.gatsbyImageData,
		coverImageUrl: frontmatter.cover.publicURL,
		coverImageAlt: frontmatter.coverAlt,

		datePublished: new Date(frontmatter.datePublished),
		dateModified: new Date(
			frontmatter.dateModified || frontmatter.datePublished
		),

		category: frontmatter.category,
		tags: tagList,

		body: mdxNode.body,
		internalContent: mdxNode.internal?.content,
		excerpt: mdxNode.excerpt,
		timeToRead: mdxNode.timeToRead,

		slug: mdxNode.fields.slug,
		route: mdxNode.fields.route,
		pathName: mdxNode.fields.pathName,
		url: mdxNode.fields.url
	};
}

export function queryToPost (data: IPostBySlugQueryResult): IPost {
	const postData = data.mdx;

	if (!postData) {
		throw Error('[queryToPost]: Query does not contain post data');
	}

	return mdxNodeToPost(postData);
}

export function jsonToPost (meta: IPostJson): IPost {
	const {
		dateModified,
		datePublished,
		slug,
		route,
		pathName,
		url,
		timeToRead,
		title,
		category,
		coverImg,
		coverImageAlt,
		coverImageUrl,
		description,
		excerpt,
		tags,
		relatedPosts
	} = meta;

	return {
		title,

		description,
		coverImg,
		coverImageUrl,
		coverImageAlt,

		datePublished: new Date(datePublished),
		dateModified: new Date(dateModified),

		category,
		tags,

		excerpt,
		timeToRead,

		slug,
		route,
		pathName,
		url,

		relatedPosts: relatedPosts ? relatedPosts.map(jsonToPost) : undefined
	};
}

export function queryToPostsList (res: IGetMdxPostsQueryResult): IPost[] {
	const { edges } = res.allMdx;

	const nodes = edges.map((edge) => edge.node);

	return nodes.map((node) => mdxNodeToPost(node));
}

export function queryToUser (data: IUserQueryResult): IUserMetadata {
	const { user } = data.site.siteMetadata.config;

	if (!user) {
		throw Error('[queryToUser]: Query does not contain user data');
	}

	return user;
}
