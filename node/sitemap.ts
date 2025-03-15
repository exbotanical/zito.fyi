import { SiteConfig } from '@/types'

import { GetMdxPostsQueryResult } from './types'

export interface ResolvedSitemapPage {
  path: string
  lastmod?: string
  changefreq: string
  priority: number
}

export function generateSitemapData(config: SiteConfig) {
  return function resolveAllPages({
    allMdx,
    allCategories,
    allTags,
  }: {
    allMdx: GetMdxPostsQueryResult['allMdx']
    allCategories: { distinct: string[] }
    allTags: { distinct: string[] }
  }): ResolvedSitemapPage[] {
    const basePath = config.site.url
    const now = new Date().toISOString()

    const posts = allMdx.edges.map(({ node }) => ({
      path: `${config.site.url}${node.fields!.slug}`,
      lastmod:
        node.frontmatter!.dateModified || node.frontmatter!.datePublished,
      changefreq: 'weekly',
      priority: 0.7,
    }))

    const categoryPages = allCategories.distinct.map(category => ({
      path: `${basePath}/category/${category}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.5,
    }))

    const tagPages = allTags.distinct.map(tag => ({
      path: `${basePath}/tag/${tag}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.5,
    }))

    return [
      ...posts,
      ...categoryPages,
      ...tagPages,
      {
        path: `${basePath}/`,
        changefreq: 'daily',
        priority: 1.0,
      },
    ]
  }
}
