import type { SiteConfig } from '../src/types'
import type { FeedPluginData, FeedPluginItem } from './types'

export function generateRssFeed(config: SiteConfig) {
  return function mapEdges(data: FeedPluginData) {
    const {
      query: { allMdx },
    } = data

    const edges = allMdx?.edges
    if (!edges) {
      console.warn(
        '[generateRssFeed] No MDX edges available for feed generation.',
      )
      return undefined
    }

    const res = edges.map((edge): FeedPluginItem | undefined => {
      const { node } = edge

      const slug = node.fields?.slug
      const url = slug ? config.site.url + slug : config.site.url

      return {
        categories: node.frontmatter?.tags,
        custom_elements: [
          {
            'content:encoded': node.html,
          },
          {
            author: config.user.email,
          },
        ],
        date: node.frontmatter?.datePublished,
        description: node.frontmatter?.description,
        guid: url,
        title: node.frontmatter?.title,
        url,
      }
    })

    return res
  }
}

export function setupRssFeed(config: SiteConfig) {
  return function setGenerator(ref: FeedPluginData) {
    const ret = ref.query.site?.siteMetadata?.rssMetadata

    if (!ret) {
      throw Error('`gatsby-plugin-feed` rssMetadata is not defined')
    }

    ret.generator = config.site.url.replace('https://', '')

    return ret
  }
}
