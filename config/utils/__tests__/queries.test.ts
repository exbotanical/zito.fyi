import { getAllPostsByCategory, getAllPostsByTag, getAllPosts } from '..';

import {
	allPostsByCategoryQuery,
	allPostsByTagQuery,
	allPostsQuery
} from '../../../src/templates/feed/queries';
import { postsListQueryResponse } from '../../../__tests__/fixtures';

jest.spyOn(global.console, 'warn').mockImplementation();
jest.spyOn(global.console, 'error').mockImplementation();

const categoryQueryResponse = {
	data: {
		allMdx: {
			edges: postsListQueryResponse.allMdx.edges.filter(
				(edge) => edge.node?.frontmatter?.category === 'category'
			)
		}
	}
};
const tagQueryResponse = {
	data: {
		allMdx: {
			edges: postsListQueryResponse.allMdx.edges.filter((edge) =>
				edge.node?.frontmatter?.tags?.includes('tag')
			)
		}
	}
};
const indexQueryResponse = { data: postsListQueryResponse };

describe('build util `getAllPosts`', () => {
	it('returns the index feed', async () => {
		const graphql = jest.fn().mockResolvedValue(indexQueryResponse);

		const posts = await getAllPosts(graphql);

		expect(graphql).toHaveBeenCalledWith(allPostsQuery);
		expect(posts).toMatchSnapshot();
	});

	it('warns when no data is returned', async () => {
		const graphql = jest.fn().mockResolvedValue({ data: undefined });

		const posts = await getAllPosts(graphql);

		expect(console.warn).toHaveBeenCalled();
		expect(posts).toStrictEqual([]);
	});

	it('propagates query errors', async () => {
		const graphql = jest.fn().mockResolvedValue({ errors: 'TEST ERROR' });

		await expect(getAllPosts(graphql)).rejects.toThrow('TEST ERROR');

		expect(console.error).toHaveBeenCalled();
		expect(console.error).toHaveBeenCalledWith('TEST ERROR');
	});
});

describe('build util `getAllPostsByTag`', () => {
	it('returns the tag feed', async () => {
		const graphql = jest.fn().mockResolvedValue(tagQueryResponse);

		const posts = await getAllPostsByTag(graphql, 'tag');

		expect(graphql).toHaveBeenCalledWith(allPostsByTagQuery, {
			tag: 'tag'
		});
		expect(posts).toMatchSnapshot();
	});
});

describe('build util `getAllPostsByCategory`', () => {
	it('returns the category feed', async () => {
		const graphql = jest.fn().mockResolvedValue(categoryQueryResponse);

		const posts = await getAllPostsByCategory(graphql, 'category');

		expect(graphql).toHaveBeenCalledWith(allPostsByCategoryQuery, {
			category: 'category'
		});

		expect(posts).toMatchSnapshot();
	});
});
