import urlJoin from 'url-join'

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
import { StreamLogger } from '../node/logger'

import { config } from './config'

import type { BaseFrontmatter } from '../node/types'
import type { GatsbyNode } from 'gatsby'

StreamLogger.init()
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

    // pathName sans the pathPrefix, used for creating pages
    const route = withBasePath(config, slug)

    // for internal linking
    const pathName = urlJoin(config.pathPrefix, route)

    // absolute path of the post
    const url = urlJoin(config.site.url, pathName)

    // set fields route, url, pathName, slug
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
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    actions.createTypes(`#graphql
			${ConfigSchema}
		`)
  }

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const uniqueTags = new Set<string>()
  const uniqueCategories = new Set<string>()

  setupFeedMetadataDir()

  const allPosts = await getAllPosts(graphql)

  allPosts.forEach((post, index) => {
    const { tags, category } = post
    if (tags) {
      tags.forEach(tag => {
        uniqueTags.add(tag)
      })
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
      component: POST_PAGE_COMPONENT,
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
  })

  // create primary posts feed
  await createFeed(config, actions, allPosts, 'index')

  // tasks to create 'posts by tag' feeds
  const tagTasks = Array.from(uniqueTags.keys()).map(async tag => {
    const postsByTag = await getAllPostsByTag(graphql, tag)

    await createFeed(config, actions, postsByTag, 'tag', tag)
  })

  await Promise.all(tagTasks)

  // tasks to create 'posts by category' feeds
  const categoryTasks = Array.from(uniqueCategories.keys()).map(
    async category => {
      const postsByCategory = await getAllPostsByCategory(graphql, category)

      await createFeed(config, actions, postsByCategory, 'category', category)
    },
  )

  await Promise.all(categoryTasks)
}
