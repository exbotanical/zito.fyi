import type { IPost } from '../../src/types';

const N_RELATED_POSTS = 2;
const categoryMappingCache = new Map<string, IPost[]>();

/**
 * @summary Get posts of a given category
 */
const getPostsOfCategory = (category: string, posts: IPost[]): IPost[] => {
	const cachedCategory = categoryMappingCache.get(category);
	if (cachedCategory) return cachedCategory;

	posts.forEach((post) => {
		if (post.category === category) {
			const mappedPosts = categoryMappingCache.get(category) || [];
			mappedPosts.push(post);

			categoryMappingCache.set(category, mappedPosts);
		}
	});

	return categoryMappingCache.get(category) || [];
};

/**
 * @summary Get posts of a tag, ranked by matches
 */
const getRankedPostsOfTag = (targetPost: IPost, posts: IPost[]): IPost[] => {
	if (!targetPost.tags) return posts;

	const rankedPosts: {
		rank: number;
		post: IPost;
	}[] = [];

	// increment the ranking once per tag match
	posts.forEach((post) => {
		let rank = 0;

		if (post.tags) {
			post.tags.forEach((tag) => {
				if (targetPost.tags?.includes(tag)) {
					rank += 1;
				}
			});
		}

		rankedPosts.push({
			rank,
			post
		});
	});

	rankedPosts.sort((a, b) => {
		if (a.rank > b.rank) return -1;
		if (a.rank < b.rank) return 1;

		return 0;
	});

	// extract the posts
	return rankedPosts.map((rankedPost) => rankedPost.post);
};

/**
 * @summary Get n posts related to a given post
 * @todo fix duplications
 */
export const getNRelatedPosts = (
	targetPost: IPost,
	posts: IPost[]
): IPost[] => {
	// exclude the target post from the posts
	const filteredPosts = posts.filter((post) => post.slug !== targetPost.slug);

	const relatedPosts: IPost[] = [];

	if (targetPost.category) {
		const categoryPosts = getPostsOfCategory(
			targetPost.category,
			filteredPosts
		);

		const rankedMatches = getRankedPostsOfTag(targetPost, categoryPosts);

		// select top N posts
		relatedPosts.push(...rankedMatches.slice(0, N_RELATED_POSTS));
	}

	// return if sufficient matches
	if (relatedPosts.length > 1) return relatedPosts;

	// add one more tag match if only a single category match
	if (relatedPosts.length === 1) {
		const rankedTagMatches = getRankedPostsOfTag(targetPost, filteredPosts);

		// filter out the existing related post
		const tagMatchesSansExistingMatch = rankedTagMatches.filter(
			(tagMatch) => tagMatch.slug !== relatedPosts[0]?.slug
		);

		const highestRankedMatch = tagMatchesSansExistingMatch[0];

		if (highestRankedMatch) {
			relatedPosts.push(highestRankedMatch);

			return relatedPosts;
		}
	}

	// we've no category matches; get a tag-based ranking of all posts
	return getRankedPostsOfTag(targetPost, filteredPosts).slice(
		0,
		N_RELATED_POSTS
	);
};
