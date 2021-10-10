import { kebabCase } from 'lodash';
import urlJoin from 'url-join';

import type { ISiteConfig } from '../../src/types';
import type { IBaseFrontmatter } from './types';

export * from './constants';
export * from './feed';
export * from './queries';
export * from './related';
export * from './rss';

export const generateSlug = (
	frontmatter?: IBaseFrontmatter
): string | undefined => {
	if (frontmatter) {
		const { slug, title } = frontmatter;
		if (slug) return `/${kebabCase(slug)}`;

		if (title) return `/${kebabCase(title)}`;
	}

	console.error('Missing post slug and title. Unable to generate a slug.');
};

export const withBasePath = (config: ISiteConfig, url: string): string =>
	config.basePath ? urlJoin(config.basePath, url) : url;
