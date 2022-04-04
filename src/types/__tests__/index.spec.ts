import cloneDeep from 'clone-deep';
import { mocked } from 'jest-mock';

import {
	postsListQueryResponse,
	postQueryResult,
	post,
	config
} from '@test/fixtures';
import {
	mdxNodeToPost,
	queryToPost,
	jsonToPost,
	queryToPostsList
} from '@/utils';

import type { PostJson } from '..';

const consoleWarnSpy = jest
	.spyOn(global.console, 'warn')
	.mockImplementation(() => {});

jest.mock('@/config');
const mockedConfig = mocked(config, true);
mockedConfig.site.url = 'http://test.com';
mockedConfig.pathPrefix = '/test';

const testError = Error('Invalid `postQueryResult` object used in a test');

describe('`mdxNodeToPost`', () => {
	it('generates correct post data', () => {
		const post = mdxNodeToPost(postQueryResult.mdx!);

		expect(post).toMatchSnapshot();
	});

	it('falls back to `datePublished` if `dateModified` has not been set', () => {
		const mdxNodeSansDateModified = cloneDeep(postQueryResult.mdx)!;

		// eslint-disable-next-line jest/no-if
		if (
			!mdxNodeSansDateModified.frontmatter ||
			!mdxNodeSansDateModified.frontmatter.datePublished
		) {
			throw testError;
		}

		mdxNodeSansDateModified.frontmatter.dateModified = undefined;

		const post = mdxNodeToPost(mdxNodeSansDateModified);

		expect(post.dateModified).toStrictEqual(
			new Date(mdxNodeSansDateModified.frontmatter.datePublished)
		);
	});

	it('throws when missing MDX data', () => {
		const invalidMdx = cloneDeep(postQueryResult.mdx)!;

		invalidMdx.timeToRead = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();
	});

	it('throws when missing frontmatter', () => {
		const invalidMdx = cloneDeep(postQueryResult.mdx)!;

		// eslint-disable-next-line jest/no-if
		if (!invalidMdx.frontmatter) {
			throw testError;
		}

		invalidMdx.frontmatter.coverAlt = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();

		invalidMdx.frontmatter.cover = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();

		invalidMdx.frontmatter.datePublished = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();

		invalidMdx.frontmatter.title = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();

		invalidMdx.frontmatter = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();
	});

	it('throws when missing fields', () => {
		const invalidMdx = cloneDeep(postQueryResult.mdx)!;

		// eslint-disable-next-line jest/no-if
		if (!invalidMdx.fields) {
			throw testError;
		}

		invalidMdx.fields.route = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();

		invalidMdx.fields.url = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();

		invalidMdx.fields.pathName = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();

		invalidMdx.fields.slug = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();

		invalidMdx.fields = undefined;

		expect(() => mdxNodeToPost(invalidMdx)).toThrow();
	});

	it('warns when missing SEO fields', () => {
		const partialMdx = cloneDeep(postQueryResult.mdx)!;

		// eslint-disable-next-line jest/no-if
		if (!partialMdx.frontmatter) {
			throw testError;
		}

		partialMdx.frontmatter.description = undefined;

		mdxNodeToPost(partialMdx);

		expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
	});
});

describe('`queryToPost`', () => {
	it('generates correct post data', () => {
		const post = queryToPost(postQueryResult);

		expect(post).toMatchSnapshot();
	});

	it('throws when missing data', () => {
		expect(() => queryToPost({ mdx: undefined })).toThrow();
	});
});

describe('`queryToPostsList`', () => {
	it('generates correct posts list', () => {
		const res = queryToPostsList(postsListQueryResponse);

		expect(res).toMatchSnapshot();
	});
});

describe('`jsonToPost`', () => {
	it('converts JSON based post metadata into a post', () => {
		const jsonPost = JSON.parse(JSON.stringify(post)) as PostJson;

		const generatedPost = jsonToPost(jsonPost);

		expect(generatedPost).toMatchSnapshot();

		const postWithRelated = cloneDeep(post);
		postWithRelated.relatedPosts = [post];

		const jsonPostWithRelated = JSON.parse(
			JSON.stringify(postWithRelated)
		) as PostJson;

		const generatedPostWithRelated = jsonToPost(jsonPostWithRelated);

		expect(generatedPostWithRelated).toMatchSnapshot();
	});
});
