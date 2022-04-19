import kebabCase from 'lodash.kebabcase'
import urlJoin from 'url-join'

import type { SiteConfig } from '../src/types'
import type { BaseFrontmatter } from './types'

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

export const withBasePath = (config: SiteConfig, url: string): string =>
  config.basePath ? urlJoin(config.basePath, url) : url
