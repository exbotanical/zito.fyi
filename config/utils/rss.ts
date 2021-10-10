import type { ISiteConfig } from '../../src/types';
import type {
	IFeedPluginData,
	IRssFeedMetadata,
	IFeedPluginItem
} from './types';

export const generateRssFeed =
	(config: ISiteConfig) =>
		(data: IFeedPluginData): (IFeedPluginItem | undefined)[] | undefined => {
			const {
				query: { allMdx }
			} = data;

			const edges = allMdx?.edges;

			if (!edges) {
				console.warn(
					'[generateRssFeed] No MDX edges available for feed generation.'
				);
				return undefined;
			}

			const res = edges.map((edge): IFeedPluginItem | undefined => {
				const { node } = edge;

				const slug = node.fields?.slug;
				const url = slug ? config.site.url + slug : config.site.url;

				return {
					categories: node?.frontmatter?.tags,
					date: node?.frontmatter?.datePublished,
					title: node?.frontmatter?.title,
					description: node.excerpt,
					url,
					guid: url,
					custom_elements: [
						{ 'content:encoded': node.html },
						{ author: config.user.email }
					]
				};
			});

			return res;
		};

export const setupRssFeed =
	(config: ISiteConfig) =>
		(ref: IFeedPluginData): IRssFeedMetadata => {
			const ret = ref.query?.site?.siteMetadata?.rssMetadata;

			if (!ret) {
				throw Error('`gatsby-plugin-feed` rssMetadata is not defined');
			}

			ret.generator = config.site.url.replace('https://', '');

			return ret;
		};
