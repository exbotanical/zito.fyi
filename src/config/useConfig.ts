import { useStaticQuery, graphql } from 'gatsby';

import type { ISiteConfig } from '@/types';

interface IUserConfigQuery {
	site?: {
		siteMetadata?: {
			config?: ISiteConfig;
		};
	};
}

export const useConfig = (): ISiteConfig => {
	const data = useStaticQuery<IUserConfigQuery>(
		graphql`
			query UserConfig {
				site {
					siteMetadata {
						config {
							contentDir
							assetDir
							embeddedImageWidth
							embeddedVideoWidth
							basePath
							iconPath
							iconCachePaths
							iconList {
								src
								sizes
								type
								purpose
							}
							organization {
								description
								logoUrl
								name
								url
							}
							pathPrefix
							user {
								about
								avatar
								firstName
								github
								email
								id
								surname
								linkedIn
								location
								twitterHandle
							}
							site {
								backgroundColor
								copyright
								description
								language
								facebookAppId
								googleAnalyticsId
								disqusShortname
								logoUrl
								name
								rss
								rssTitle
								themeColor
								title
								titleAbridged
								twitterHandle
								url
							}
						}
					}
				}
			}
		`
	);

	const config = data?.site?.siteMetadata?.config;

	if (!config) throw Error('[useConfig] Failed to query Site Config.');

	return config;
};
