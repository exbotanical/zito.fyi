import readingTime from 'reading-time'
import urlJoin from 'url-join'

import type { MdxNode } from '@/types'

import {
  generateSlug,
  withBasePath,
  getNRelatedPosts,
  createFeed,
  setupFeedMetadataDir,
  getAllPosts,
  getAllPostsByTag,
  getAllPostsByCategory,
  ConfigSchema,
} from '../node'

import { config } from './config'

import type { BaseFrontmatter } from '../node/types'
import type { GatsbyNode } from 'gatsby'

// eslint-disable-next-line unicorn/prefer-module -- using cjs module type
const POST_PAGE_COMPONENT = require.resolve('../src/templates/post/queries.ts')

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions }) => {
  if (node.internal.type === 'Mdx' && node.parent) {
    const slug = generateSlug(node.frontmatter as BaseFrontmatter)

    if (!slug) {
      console.error(
        '[onCreateNode]: Cannot generate slug for provided `mdx` frontmatter data',
      )

      return
    }

    // PathName sans the pathPrefix, used for creating pages
    const route = withBasePath(config, slug)

    // For internal linking
    const pathName = urlJoin(config.pathPrefix, route)

    // Absolute path of the post
    const url = urlJoin(config.site.url, pathName)

    // Set fields route, url, pathName, slug
    actions.createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    actions.createNodeField({
      name: 'route',
      node,
      value: route,
    })

    actions.createNodeField({
      name: 'pathName',
      node,
      value: pathName,
    })

    actions.createNodeField({
      name: 'url',
      node,
      value: url,
    })

    if (!node.body || typeof node.body !== 'string') {
      throw new Error(`Expected node.body to be a string (node ${node.id})`)
    }

    actions.createNodeField({
      node,
      name: 'timeToRead',
      value: readingTime(node.body),
    })
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
  schema,
}) => {
  actions.createTypes(`#graphql
			${ConfigSchema}
		`)

  /**
   * Create an `isNotPublishedYet` helper for filtering `datePublished`.
   */
  actions.createTypes([
    schema.buildObjectType({
      name: 'Mdx',
      interfaces: ['Node'],
      fields: {
        isNotPublishedYet: {
          type: 'Boolean!',
          resolve: (source: MdxNode) =>
            source.frontmatter?.datePublished && process.env.NODE_ENV === 'production'
              ? new Date(source.frontmatter.datePublished) > new Date()
              : false,
        },
      },
    }),
  ])
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const uniqueTags = new Set<string>()
  const uniqueCategories = new Set<string>()

  setupFeedMetadataDir()

  const allPosts = await getAllPosts(graphql)

  for (const [index, post] of allPosts.entries()) {
    const { tags, category } = post
    if (tags) {
      for (const tag of tags) {
        uniqueTags.add(tag)
      }
    }

    if (category) {
      uniqueCategories.add(category)
    }

    const nextId = index + 1 < allPosts.length ? index + 1 : 0
    const prevId = index - 1 >= 0 ? index - 1 : allPosts.length - 1
    const nextPost = allPosts[nextId]
    const prevPost = allPosts[prevId]
    const relatedPosts = getNRelatedPosts(post, allPosts)

    actions.createPage({
      component: `${POST_PAGE_COMPONENT}?__contentFilePath=${post.contentFilePath}`,
      context: {
        nextslug: nextPost.slug,
        nexttitle: nextPost.title,
        prevslug: prevPost.slug,
        prevtitle: prevPost.title,
        relatedPosts,
        slug: post.slug,
      },
      path: post.route,
    })
  }

  // Create primary posts feed
  await createFeed(config, actions, allPosts, 'index')

  // Tasks to create 'posts by tag' feeds
  const tagTasks = [...uniqueTags.keys()].map(async tag => {
    const postsByTag = await getAllPostsByTag(graphql, tag)

    await createFeed(config, actions, postsByTag, 'tag', tag)
  })

  await Promise.all(tagTasks)

  // Tasks to create 'posts by category' feeds
  const categoryTasks = [...uniqueCategories.keys()].map(async category => {
    const postsByCategory = await getAllPostsByCategory(graphql, category)

    await createFeed(config, actions, postsByCategory, 'category', category)
  })

  await Promise.all(categoryTasks)
}
