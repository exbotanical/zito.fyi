import { getNRelatedPosts } from '..';

import type { IPost } from '../../../src/types';

const postsList = [
	{
		title: 'Test One',
		category: 'technology',
		tags: ['programming', 'software', 'markdown', 'blog post'],
		slug: 'test-one'
	},
	{
		title: 'Test Two',
		category: 'cat',
		tags: ['tag'],
		slug: 'test-two'
	},
	{
		title: 'Test Three',
		category: 'something',
		tags: [],
		slug: 'test-three'
	},
	{
		title: 'Test Four',
		category: 'technology',
		tags: ['programming', 'code', 'testing', 'tags', 'sorting', 'querying'],
		slug: 'test-four'
	},
	{
		title: 'Test Five',
		category: 'c',
		tags: undefined,
		slug: 'test-five'
	},
	{
		title: 'A Hamburger',
		category: 'test3',
		tags: ['food', 'other'],
		slug: 'great-restaurants'
	},
	{
		title: 'Italics',
		category: 'technology',
		tags: ['tag'],
		slug: 'birch'
	},
	{
		title: 'The Test',
		category: 'another one',
		tags: ['test Two', 'again', 'tagging'],
		slug: 'test-i'
	},
	{
		title: 'Bold Test',
		category: 'tech',
		tags: ['programming', 'another', 'other'],
		slug: 'bold'
	}
] as IPost[];

const targetPost = postsList[0] as IPost;

describe('build util `getNRelatedPosts`', () => {
	it('correctly determines related posts', () => {
		const relatedPosts = getNRelatedPosts(targetPost, postsList);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Italics');
	});

	it('correctly determines related posts when target is missing category', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: undefined },
			postsList
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Bold Test');
	});

	it('correctly determines related posts when target is missing tags', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, tags: undefined },
			postsList
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Italics');
	});

	it('returns latest posts when target is missing tags and the category', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, tags: undefined, category: undefined },
			postsList
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Two');
		expect(relatedPosts[1]?.title).toBe('Test Three');
	});

	it('returns 2 posts even when there is only one direct category match', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: 'more' },
			postsList
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Bold Test');
	});

	it('returns 2 posts even when there are no category matches', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: 'non-existent-category' },
			postsList
		);

		expect(relatedPosts).toHaveLength(2);
		expect(relatedPosts[0]?.title).toBe('Test Four');
		expect(relatedPosts[1]?.title).toBe('Bold Test');
	});

	it('works with no other posts besides the target post', () => {
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: 'non-existent-category' },
			postsList.slice(0, 1)
		);

		expect(relatedPosts).toHaveLength(0);
	});

	it('works with low amount of posts', () => {
		// edge case whereby no posts are in the secondary tag ranking
		const relatedPosts = getNRelatedPosts(
			{ ...targetPost, category: 'more' },
			postsList.slice(0, 2)
		);

		expect(relatedPosts).toHaveLength(1);
		expect(relatedPosts[0]?.title).toBe('Test Two');
	});
});
