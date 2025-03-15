import kebabCase from 'lodash.kebabcase'
import urlJoin from 'url-join'

import type { BaseFrontmatter } from './types'
import type { SiteConfig } from '../src/types'

export function generateSlug(
  frontmatter?: BaseFrontmatter,
): string | undefined {
  if (frontmatter) {
    const { slug, title } = frontmatter

    if (slug || title) {
      return `/${kebabCase(slug || title)}`
    }
  }

  console.error('Missing post slug and title. Unable to generate a slug.')
}

export function withBasePath(config: SiteConfig, url: string) {
  return config.basePath ? urlJoin(config.basePath, url) : url
}
