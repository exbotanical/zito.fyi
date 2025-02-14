import type {
  MdxNode,
  Post,
  PostJson,
  PostBySlugQueryResult,
  UserQueryResult,
  UserMetadata,
} from '@/types'

import type { GetMdxPostsQueryResult } from '../../node/types'

export function mdxNodeToPost(mdxNode: MdxNode): Post {
  const { frontmatter } = mdxNode

  if (!frontmatter) {
    throw Error(
      `[mdxNodeToPost] Post missing frontmatter. Post slug: ${
        mdxNode.fields?.slug || 'was not provided'
      }.`,
    )
  }

  if (!frontmatter.title) {
    throw Error(
      `[mdxNodeToPost] Post missing title. Post slug: ${
        mdxNode.fields?.slug || 'was not provided'
      }.`,
    )
  }

  if (!frontmatter.datePublished) {
    throw Error(
      `[mdxNodeToPost] Post missing publication date. Post slug: ${
        mdxNode.fields?.slug || 'was not provided'
      }.`,
    )
  }

  if (!mdxNode.fields) {
    throw Error(
      `[mdxNodeToPost] Post missing fields. Post title: ${frontmatter.title}.`,
    )
  }

  if (!mdxNode.fields.slug) {
    throw Error(
      `[mdxNodeToPost] Post missing slug. Post title: ${frontmatter.title}.`,
    )
  }

  if (!mdxNode.fields.pathName) {
    throw Error(
      `[mdxNodeToPost] Post missing pathName. Post slug: ${mdxNode.fields.slug}.`,
    )
  }

  if (!mdxNode.fields.url) {
    throw Error(
      `[mdxNodeToPost] Post missing url. Post slug: ${mdxNode.fields.slug}.`,
    )
  }

  if (!mdxNode.fields.route) {
    throw Error(
      `[mdxNodeToPost] Post missing route. Post slug: ${mdxNode.fields.slug}.`,
    )
  }

  if (!mdxNode.timeToRead?.text) {
    throw Error(
      `[mdxNodeToPost] Post missing timeToRead. Post slug: ${mdxNode.fields.slug}.`,
    )
  }

  if (!frontmatter.cover) {
    throw Error(
      `[mdxNodeToPost] Post missing cover image. Post slug: ${
        mdxNode.fields.slug || 'was not provided'
      }.`,
    )
  }

  if (!frontmatter.coverAlt) {
    throw Error(
      `[mdxNodeToPost] Post missing cover alt. Post slug: ${
        mdxNode.fields.slug || 'was not provided'
      }.`,
    )
  }

  if (!frontmatter.description) {
    console.warn(
      `[mdxNodeToPost] Post missing description. Post slug: ${
        mdxNode.fields.slug || 'was not provided'
      }. `,
    )
  }

  const tagsFilter = (tag: string | undefined): tag is string =>
    typeof tag !== 'undefined'
  const tagList = frontmatter.tags ? frontmatter.tags.filter(tagsFilter) : []

  return {
    body: mdxNode.body,
    category: frontmatter.category,
    coverImageAlt: frontmatter.coverAlt,
    coverImageUrl: frontmatter.cover.publicURL,
    coverImg: frontmatter.cover.childImageSharp?.gatsbyImageData,
    dateModified: new Date(
      frontmatter.dateModified || frontmatter.datePublished,
    ),
    datePublished: new Date(frontmatter.datePublished),
    description: frontmatter.description,
    // TODO: CHECK THIS AGAINST mdxNode.internal.content
    internalContent: mdxNode.body,
    contentFilePath: mdxNode.internal?.contentFilePath,
    pathName: mdxNode.fields.pathName,
    route: mdxNode.fields.route,
    slug: mdxNode.fields.slug,
    tags: tagList,
    timeToRead: mdxNode.timeToRead.text,
    title: frontmatter.title,
    url: mdxNode.fields.url,
  }
}

export function queryToPost(data: PostBySlugQueryResult): Post {
  const postData = data.mdx

  if (!postData) {
    throw Error('[queryToPost]: Query does not contain post data')
  }

  return mdxNodeToPost(postData)
}

export function jsonToPost(meta: PostJson): Post {
  const { relatedPosts } = meta

  return {
    ...meta,
    dateModified: new Date(meta.dateModified),
    datePublished: new Date(meta.datePublished),
    relatedPosts: relatedPosts ? relatedPosts.map(jsonToPost) : undefined,
  }
}

export function queryToPostsList(res: GetMdxPostsQueryResult): Post[] {
  const { edges } = res.allMdx

  return edges.map(edge => mdxNodeToPost(edge.node))
}

export function queryToUser(data: UserQueryResult): UserMetadata {
  return data.site.siteMetadata.config.user
}
