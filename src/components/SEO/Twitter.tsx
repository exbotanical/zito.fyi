import type { UserMetadata, BaseSiteMetadata } from '@/types'

import type { SeoData, TwitterTagList } from './types'

interface SeoArgs {
  seoData: SeoData
  userData?: UserMetadata
  siteData: BaseSiteMetadata
}

export function TwitterTags({
  seoData,
  userData,
  siteData,
}: SeoArgs): TwitterTagList {
  const { title, description, imageUrl, imageAlt } = seoData
  const userTwitterHandle = userData?.twitterHandle
  const siteTwitterHandle = siteData.twitterHandle

  const tagList: TwitterTagList = []

  const addTypeSafeTag = (name: string, content: string) => {
    tagList.push(<meta content={content} name={name} />)
  }

  addTypeSafeTag('twitter:card', 'summary_large_image')
  addTypeSafeTag('twitter:title', title)

  if (description) {
    addTypeSafeTag('twitter:description', description)
  }

  if (imageUrl) {
    addTypeSafeTag('twitter:image', imageUrl)
  }
  addTypeSafeTag('twitter:image:alt', imageAlt)

  if (userTwitterHandle) {
    addTypeSafeTag('twitter:creator', userTwitterHandle)
  }

  if (siteTwitterHandle) {
    addTypeSafeTag('twitter:site', siteTwitterHandle)
  }

  return tagList.map(tag => ({
    ...tag,
    key: tag.props.name,
  }))
}
