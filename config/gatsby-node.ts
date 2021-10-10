import { GatsbyNode } from 'gatsby';
import urlJoin from 'url-join';

import {
	getAllPosts,
	getAllPostsByTag,
	getAllPostsByCategory
} from './utils/queries';
import { createFeed, setupFeedMetadataDir } from './utils/feed';
import { generateSlug, withBasePath, getNRelatedPosts } from './utils';
import { ConfigSchema } from './utils/schema';
import { IBaseFrontmatter } from './utils/types';
// we must import directly in order to mock this
import { config } from './config';

const POST_PAGE_COMPONENT = require.resolve('../src/templates/post/queries.ts');

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
	if (node.internal.type === 'Mdx' && node.parent) {
		const slug = generateSlug(node.frontmatter as IBaseFrontmatter);

		if (!slug) {
			console.error(
				'[onCreateNode]: Cannot generate slug for provided `mdx` frontmatter data'
			);

			return;
		}

		// pathName sans the pathPrefix, used for creating pages
		const route = withBasePath(config, slug);

		// for internal linking
		const pathName = urlJoin(config.pathPrefix, route);

		// absolute path of the post
		const url = urlJoin(config.site.url, pathName);

		// set fields route, url, pathName, slug
		actions.createNodeField({ node, name: 'slug', value: slug });
		actions.createNodeField({ node, name: 'route', value: route });
		actions.createNodeField({ node, name: 'pathName', value: pathName });
		actions.createNodeField({ node, name: 'url', value: url });
	}
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
	({ actions }) => {
		actions.createTypes(`#graphql
     ${ConfigSchema}
   `);
	};

export const createPages: GatsbyNode['createPages'] = async ({
	graphql,
	actions
}) => {
	const uniqueTags = new Set<string>();
	const uniqueCategories = new Set<string>();

	setupFeedMetadataDir();

	const allPosts = await getAllPosts(graphql);

	allPosts.forEach((post, index) => {
		const { tags } = post;

		if (tags) {
			tags.forEach((tag) => {
				uniqueTags.add(tag);
			});
		}

		const { category } = post;
		if (category) {
			uniqueCategories.add(category);
		}

		const nextId = index + 1 < allPosts.length ? index + 1 : 0;
		const prevId = index - 1 >= 0 ? index - 1 : allPosts.length - 1;
		const nextPost = allPosts[nextId];
		const prevPost = allPosts[prevId];

		const relatedPosts = getNRelatedPosts(post, allPosts);

		actions.createPage({
			path: post.route,
			component: POST_PAGE_COMPONENT,
			context: {
				slug: post.slug,
				nexttitle: nextPost?.title,
				nextslug: nextPost?.slug,
				prevtitle: prevPost?.title,
				prevslug: prevPost?.slug,
				relatedPosts
			}
		});
	});

	// create primary posts feed
	await createFeed(config, actions, allPosts, 'index');

	// tasks to create 'posts by tag' feeds
	const tagTasks = Array.from(uniqueTags.keys()).map(async (tag) => {
		const postsByTag = await getAllPostsByTag(graphql, tag);

		await createFeed(config, actions, postsByTag, 'tag', tag);
	});

	await Promise.all(tagTasks);

	// tasks to create 'posts by category' feeds
	const categoryTasks = Array.from(uniqueCategories.keys()).map(
		async (category) => {
			const postsByCategory = await getAllPostsByCategory(graphql, category);

			await createFeed(config, actions, postsByCategory, 'category', category);
		}
	);

	await Promise.all(categoryTasks);
};
