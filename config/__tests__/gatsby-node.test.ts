import { mocked } from 'jest-mock'

import { config } from '@@/fixtures'
import { GatsbyActionsMock } from '@@/utils/gatsbyActions'
import { GatsbySchemaMock } from '@@/utils/gatsbySchema'

import * as feedUtils from '../../node'
import {
  onCreateNode,
  createSchemaCustomization,
  createPages,
} from '../gatsby-node'

import type {
  Node,
  CreateNodeArgs,
  PluginOptions,
  CreateSchemaCustomizationArgs,
  CreatePagesArgs,
} from 'gatsby'

const mockedGatsbyActions = mocked(GatsbyActionsMock, true)

// because Gatsby's `GatsbyNode` interface properties are optional,
// our types get picked up as being possibly undefined...
// we'd want to use type guards if this was a plugin / library, but it's not,
// and we can be assured that if we're importing these implementations, they
// are indeed defined
const [onCreateNodeImpl, createSchemaCustomizationImpl, createPagesImpl] = [
  onCreateNode!,
  createSchemaCustomization!,
  createPages!,
]

type NodeArgs = CreateNodeArgs

jest.spyOn(global.console, 'error').mockImplementation()

jest.mock('../config', () => ({
  config: {
    pathPrefix: '/test-prefix',
    basePath: '/test-base',
    site: {
      url: 'https://example.com',
    },
  },
}))
const mockedConsole = mocked(global.console, true)

jest.mock('../../node/feed', () => ({
  createFeed: jest.fn(),
  setupFeedMetadataDir: jest.fn(),
}))

const feedUtilsMock = mocked(feedUtils, true)

jest.mock('../../node/queries', () => {
  const postsList =
    jest.requireActual<typeof import('@@/fixtures')>('@@/fixtures').postsList

  const testPostsList = [
    ...postsList,
    { ...postsList[0], category: undefined, tags: undefined },
  ]

  return {
    getAllPosts: jest.fn().mockResolvedValue(testPostsList),
    getAllPostsByTag: jest.fn().mockResolvedValue(testPostsList),
    getAllPostsByCategory: jest.fn().mockResolvedValue(testPostsList),
  }
})

describe('onCreateNode', () => {
  it('sets proper fields for MDX nodes', async () => {
    const testNode = {
      id: 'testId',
      children: [],
      parent: 'parentId',
      internal: {
        type: 'Mdx',
        contentDigest: 'testDigest',
        owner: 'testOwner',
      },
      frontmatter: {
        title: 'Test Title',
        slug: 'Test Slug',
      },
    } as Node

    const nodeArgs = {
      actions: GatsbyActionsMock,
      node: testNode,
    } as unknown as NodeArgs

    const opts = config as unknown as PluginOptions

    await onCreateNodeImpl(nodeArgs, opts, () => {})

    expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
      node: testNode,
      name: 'slug',
      value: '/test-slug',
    })

    expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
      node: testNode,
      name: 'route',
      value: '/test-base/test-slug',
    })

    expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
      node: testNode,
      name: 'pathName',
      value: '/test-prefix/test-base/test-slug',
    })

    expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
      node: testNode,
      name: 'url',
      value: 'https://example.com/test-prefix/test-base/test-slug',
    })
  })

  it('sets proper slug field for MDX nodes when missing the frontmatter slug field', async () => {
    const testNode = {
      id: 'testId',
      children: [],
      parent: 'parentId',
      internal: {
        type: 'Mdx',
        contentDigest: 'testDigest',
        owner: 'testOwner',
      },
      frontmatter: {
        title: 'Test Title',
      },
    } as Node

    const nodeArgs = {
      actions: GatsbyActionsMock,
      node: testNode,
    } as unknown as NodeArgs

    await onCreateNodeImpl(nodeArgs, {} as PluginOptions, () => {})

    expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledWith({
      node: testNode,
      name: 'slug',
      value: '/test-title',
    })
  })

  it('logs an error when fails to generate a slug', async () => {
    const testNode = {
      id: 'testId',
      children: [],
      parent: 'parentId',
      internal: {
        type: 'Mdx',
        contentDigest: 'testDigest',
        owner: 'testOwner',
      },
      frontmatter: {},
    } as Node

    const nodeArgs = {
      actions: GatsbyActionsMock,
      node: testNode,
    } as unknown as NodeArgs

    await onCreateNodeImpl(nodeArgs, {} as PluginOptions, () => {})

    expect(mockedConsole.error).toHaveBeenCalled()

    nodeArgs.node.frontmatter = undefined
    mockedConsole.error.mockClear()

    await onCreateNodeImpl(nodeArgs, {} as PluginOptions, () => {})

    expect(mockedConsole.error).toHaveBeenCalled()
  })

  it('ignores non-MDX nodes', async () => {
    const testNode = {
      id: 'testId',
      children: [],
      parent: 'parentId',
      internal: {
        type: 'not-mdx',
        contentDigest: 'testDigest',
        owner: 'testOwner',
      },
    } as Node

    const nodeArgs = {
      actions: GatsbyActionsMock,
      node: testNode,
    } as unknown as NodeArgs

    mockedGatsbyActions.createNodeField.mockClear()

    await onCreateNodeImpl(nodeArgs, {} as PluginOptions, () => {})

    expect(mockedGatsbyActions.createNodeField).toHaveBeenCalledTimes(0)
  })
})

describe('`createSchemaCustomization`', () => {
  it('sets GraphQL schema types', async () => {
    await createSchemaCustomizationImpl(
      {
        actions: GatsbyActionsMock,
        schema: GatsbySchemaMock,
      } as CreateSchemaCustomizationArgs,
      {} as PluginOptions,
      () => {},
    )

    expect(mockedGatsbyActions.createTypes).toHaveBeenCalledTimes(2)
  })
})

type CreatePagesFirstArg = CreatePagesArgs & {
  traceId: 'initial-createPages'
}

describe('createPages', () => {
  it('creates feed and post pages', async () => {
    await createPagesImpl(
      {
        graphql: jest.fn(),
        actions: GatsbyActionsMock,
        schema: GatsbySchemaMock,
      } as unknown as CreatePagesFirstArg,
      {} as PluginOptions,
      () => {},
    )

    expect(feedUtilsMock.setupFeedMetadataDir).toHaveBeenCalledTimes(1)
    expect(mockedGatsbyActions.createPage).toHaveBeenCalledTimes(9)

    expect(feedUtilsMock.createFeed).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      'index',
    )

    expect(feedUtilsMock.createFeed).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      'tag',
      expect.anything(),
    )
    expect(feedUtilsMock.createFeed).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      'category',
      expect.anything(),
    )
  })
})
