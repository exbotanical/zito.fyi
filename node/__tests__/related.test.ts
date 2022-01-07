import { getNRelatedPosts } from '../';
import {
	edgeCaseTargetPost,
	poolOfPosts,
	poolOfPostsFull
} from '../../test/fixtures';

const targetPost = poolOfPosts[0];

describe('build util `getNRelatedPosts`', () => {
	it('correctly determines related posts', () => {
		const relatedPosts = getNRelatedPosts(targetPost, poolOfPosts);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Italics');
	});

	it('correctly determines related posts when target is missing category', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: undefined },
			poolOfPosts
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Bold Test');
	});

	it('correctly determines related posts when target is missing tags', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, tags: undefined },
			poolOfPosts
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Italics');
	});

	it('returns latest posts when target is missing tags and the category', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, tags: undefined, category: undefined },
			poolOfPosts
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Two');
		expect(relatedPosts[1]?.title).toBe('Test Three');
	});

	it('returns 2 posts even when there is only one direct category match', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: 'more' },
			poolOfPosts
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Bold Test');
	});

	it('returns 2 posts even when there are no category matches', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: 'non-existent-category' },
			poolOfPosts
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Bold Test');
	});

	it('works with no other posts besides the target post', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: 'non-existent-category' },
			poolOfPosts.slice(0, 1)
		);

		expect(relatedPosts).toHaveLength(0);
	});

	it('works with scarce amount of posts', () => {
		// edge case whereby no posts are in the secondary tag ranking
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: 'more' },
			poolOfPosts.slice(0, 2)
		);

		expect(relatedPosts).toHaveLength(1);
		expect(relatedPosts[0]?.title).toBe('Test Two');
	});

	it('does not include the target post in the results', () => {
		// we had an edge case whereby `getPostsOfCategory` used a cache which often included duplicates
		// thus, we invoke `getNRelatedPosts` here as a precursor step, to populate the cache

		getNRelatedPosts(poolOfPostsFull[1], [
			...poolOfPostsFull,
			edgeCaseTargetPost
		]);

		// that said, the cache has been removed because it was another Zitonian pre-optimization
		// I need to be better about that...
		const relatedPosts = getNRelatedPosts(edgeCaseTargetPost, poolOfPostsFull);

		expect(relatedPosts).toHaveLength(2);
		expect(edgeCaseTargetPost.title).not.toBe(relatedPosts[0]?.title);
		expect(edgeCaseTargetPost.title).not.toBe(relatedPosts[1]?.title);
		expect(relatedPosts[0]?.title).not.toBe(relatedPosts[1]?.title);
	});
});
