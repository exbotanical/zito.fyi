import {
	Node,
	CreateNodeArgs,
	PluginOptions,
	CreateSchemaCustomizationArgs,
	CreatePagesArgs
} from 'gatsby';
import { mocked } from 'ts-jest/utils';

import {
	onCreateNode,
	createSchemaCustomization,
	createPages
} from '../gatsby-node';

import { GatsbyActionsMock } from '../../__tests__/utils/gatsbyActions';
import { config } from '../../__tests__/fixtures';

import * as feedUtils from '..';

const mockedGatsbyActions = mocked(GatsbyActionsMock, true);

type NodeArgs = CreateNodeArgs<Record<string, unknown>>;

jest.spyOn(global.console, 'error').mockImplementation();

jest.mock('../config', () => ({
	config: {
		pathPrefix: '/test-prefix',
		basePath: '/test-base',
		site: {
			url: 'https://example.com'
		}
	}
}));
const mockedConsole = mocked(global.console, true);

jest.mock('../utils/feed', () => ({
	createFeed: jest.fn(),
	setupFeedMetadataDir: jest.fn()
}));

const feedUtilsMock = mocked(feedUtils, true);

jest.mock('../utils/queries', () => {
	const postsList = jest.requireActual<
	typeof import('../../__tests__/fixtures')
	>('../../__tests__/fixtures').postsList;

	const testPostsList = [
		...postsList,
		{ ...postsList[0], category: undefined, tags: undefined }
	];

	return {
		getAllPosts: jest.fn().mockResolvedValue(testPostsList),
		getAllPostsByTag: jest.fn().mockResolvedValue(testPostsList),
		getAllPostsByCategory: jest.fn().mockResolvedValue(testPostsList)
	};
});

describe('onCreateNode', () => {
	it('sets proper fields for MDX nodes', async () => {
		const testNode = {
			id: 'testId',
			children: [],
			parent: 'parentId',
			internal: {
				type: 'Mdx',
				contentDigest: 'testDigest',
				owner: 'testOwner'
			},
			frontmatter: {
				title: 'Test Title',
				slug: 'Test Slug'
			}
		} as Node;

		const nodeArgs = {
			actions: GatsbyActionsMock,
			node: testNode
		} as unknown as NodeArgs;

		const opts = config as unknown as PluginOptions;

		// eslint-disable-next-line jest/no-if
		if (!onCreateNode) throw Error('`onCreateNode` is not defined');

		await onCreateNode(nodeArgs, opts, () => {});

		expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
			node: testNode,
			name: 'slug',
			value: '/test-slug'
		});

		expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
			node: testNode,
			name: 'route',
			value: '/test-base/test-slug'
		});

		expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
			node: testNode,
			name: 'pathName',
			value: '/test-prefix/test-base/test-slug'
		});

		expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
			node: testNode,
			name: 'url',
			value: 'https://example.com/test-prefix/test-base/test-slug'
		});
	});

	it('sets proper slug field for MDX nodes when missing the frontmatter slug field', async () => {
		const testNode = {
			id: 'testId',
			children: [],
			parent: 'parentId',
			internal: {
				type: 'Mdx',
				contentDigest: 'testDigest',
				owner: 'testOwner'
			},
			frontmatter: {
				title: 'Test Title'
			}
		} as Node;

		const nodeArgs = {
			actions: GatsbyActionsMock,
			node: testNode
		} as unknown as NodeArgs;

		// eslint-disable-next-line jest/no-if
		if (!onCreateNode) throw Error('`onCreateNode` is not defined');

		await onCreateNode(nodeArgs, {} as PluginOptions, () => {});

		expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
			node: testNode,
			name: 'slug',
			value: '/test-title'
		});
	});

	it('logs an error when fails to generate a slug', async () => {
		const testNode = {
			id: 'testId',
			children: [],
			parent: 'parentId',
			internal: {
				type: 'Mdx',
				contentDigest: 'testDigest',
				owner: 'testOwner'
			},
			frontmatter: {}
		} as Node;

		const nodeArgs = {
			actions: GatsbyActionsMock,
			node: testNode
		} as unknown as NodeArgs;

		// eslint-disable-next-line jest/no-if
		if (!onCreateNode) throw Error('onCreateNode is not defined');

		await onCreateNode(nodeArgs, {} as PluginOptions, () => {});

		expect(mockedConsole.error).toHaveBeenCalled();

		nodeArgs.node.frontmatter = undefined;
		mockedConsole.error.mockClear();

		await onCreateNode(nodeArgs, {} as PluginOptions, () => {});

		expect(mockedConsole.error).toHaveBeenCalled();
	});

	it('ignores non-MDX nodes', async () => {
		const testNode = {
			id: 'testId',
			children: [],
			parent: 'parentId',
			internal: {
				type: 'not-mdx',
				contentDigest: 'testDigest',
				owner: 'testOwner'
			}
		} as Node;

		const nodeArgs = {
			actions: GatsbyActionsMock,
			node: testNode
		} as unknown as NodeArgs;

		// eslint-disable-next-line jest/no-if
		if (!onCreateNode) throw Error('`onCreateNode` is not defined');

		mockedGatsbyActions.createNodeField.mockClear();

		await onCreateNode(nodeArgs, {} as PluginOptions, () => {});

		expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledTimes(0);
	});
});

describe('`createSchemaCustomization`', () => {
	it('sets GraphQL schema types', async () => {
		// eslint-disable-next-line jest/no-if
		if (!createSchemaCustomization) {
			throw Error('`createSchemaCustomization` is not defined');
		}

		await createSchemaCustomization(
			{ actions: GatsbyActionsMock } as CreateSchemaCustomizationArgs,
			{} as PluginOptions,
			() => {}
		);

		expect(mockedGatsbyActions.createTypes).toHaveBeenCalledTimes(1);
	});
});

type CreatePagesFirstArg = CreatePagesArgs & {
	traceId: 'initial-createPages';
};

describe('createPages', () => {
	it('creates feed and post pages', async () => {
		// eslint-disable-next-line jest/no-if
		if (!createPages) throw Error('`createPages` is not defined');

		await createPages(
			{
				graphql: jest.fn(),
				actions: GatsbyActionsMock
			} as unknown as CreatePagesFirstArg,
			{} as PluginOptions,
			() => {}
		);

		expect(feedUtilsMock.setupFeedMetadataDir).toHaveBeenCalledTimes(1);
		expect(mockedGatsbyActions.createPage).toHaveBeenCalledTimes(9);

		expect(feedUtilsMock.createFeed).toHaveBeenCalledWith(
			expect.anything(),
			expect.anything(),
			expect.anything(),
			'index'
		);

		expect(feedUtilsMock.createFeed).toHaveBeenCalledWith(
			expect.anything(),
			expect.anything(),
			expect.anything(),
			'tag',
			expect.anything()
		);
		expect(feedUtilsMock.createFeed).toHaveBeenCalledWith(
			expect.anything(),
			expect.anything(),
			expect.anything(),
			'category',
			expect.anything()
		);
	});
});
