import removeMd from 'remove-markdown'

import type { Post, BaseSiteMetadata } from '@/types'

import type { SeoData, AbridgedPost } from './types'

/**
 * Generate abridged post data from a given `allMdx` edge
 */
export function generatePostData(post: Post): AbridgedPost {
  const {
    category,
    coverImageAlt,
    coverImageUrl,
    dateModified,
    datePublished,
    description,
    internalContent,
    tags,
    title,
  } = post

  if (!internalContent) {
    throw Error(
      `[generatePostData] Post does not contain internal content necessary for Rich Tags. ${description} ${title}`,
    )
  }

  const body = removeMd(internalContent)

  return {
    body,
    category: category || 'None',
    coverImageAlt,
    coverImageUrl,
    dateModified,
    datePublished,
    description,
    tags: tags || [],
    title,
    url: post.url,
  }
}

/**
 * Generate SEO metadata
 */
export function generateSeoData(
  siteMetadata: BaseSiteMetadata,
  postData?: AbridgedPost,
): SeoData {
  const isPost = !!postData
  const title = postData ? postData.title : siteMetadata.title
  const type = postData ? 'post' : 'page'
  const imageUrl = postData ? postData.coverImageUrl : siteMetadata.logoUrl
  const imageAlt = postData ? postData.coverImageAlt : siteMetadata.description
  const url = postData ? postData.url : siteMetadata.url
  const description = postData ? postData.description : siteMetadata.description

  return {
    description,
    imageAlt,
    imageUrl,
    isPost,
    title,
    type,
    url,
  }
}
