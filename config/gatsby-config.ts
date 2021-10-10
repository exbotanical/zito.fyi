import path from 'path';

import urljoin from 'url-join';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import remarkExternalLinks from 'remark-external-links';

// https://github.com/gatsbyjs/gatsby/issues/16239
// must be < v3 due to ESM only support therein
import unwrapImages from 'remark-unwrap-images';

import type { GatsbyConfig } from 'gatsby';

import { withBasePath } from './utils';
import { generateRssFeed, setupRssFeed } from './utils/rss';
import { config } from '.';

const adjustedPathPRefix = config.pathPrefix === '' ? '/' : config.pathPrefix;

const gatsbyConfig: GatsbyConfig = {
	pathPrefix: adjustedPathPRefix,
	siteMetadata: {
		config,
		siteUrl: urljoin(config.site.url, config.pathPrefix),
		rssMetadata: {
			site_url: urljoin(config.site.url, config.pathPrefix),
			feed_url: urljoin(config.site.url, config.pathPrefix, config.site.rss),
			title: config.site.title,
			description: config.site.description,
			image_url: `${urljoin(config.site.url, config.pathPrefix)}${
				config.site.logoUrl
			}`,
			copyright: config.site.copyright
		}
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /\.svg$/
				}
			}
		},
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-lodash',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'assets',
				path: path.join(__dirname, config.assetDir || '../static')
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'posts',
				path: path.join(__dirname, config.contentDir || '../content')
			}
		},
		{
			resolve: 'gatsby-plugin-sharp',
			options: {
				defaults: {
					formats: ['auto', 'webp', 'avif'],
					placeholder: 'blurred',
					backgroundColor: 'transparent'
				},
				failOnError: true
			}
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-image',
		'gatsby-remark-images',
		{
			resolve: 'gatsby-plugin-mdx',
			options: {
				extensions: ['.md', '.mdx'],
				gatsbyRemarkPlugins: [
					{
						resolve: 'gatsby-remark-embed-video',
						options: {
							width: config.embeddedVideoWidth
						}
					},
					{
						resolve: 'gatsby-remark-responsive-iframe'
					},
					{
						resolve: 'gatsby-remark-relative-images'
					},
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: config.embeddedImageWidth,
							showCaptions: ['title', 'alt']
						}
					},
					{ resolve: 'gatsby-remark-copy-linked-files' },

					{
						resolve: 'gatsby-remark-prismjs',
						options: {
							showLineNumbers: true
						}
					}
				],
				remarkPlugins: [unwrapImages, remarkA11yEmoji, remarkExternalLinks]
			}
		},
		{
			resolve: 'gatsby-plugin-google-gtag',
			options: {
				trackingIds: [config.site.googleAnalyticsId]
			}
		},
		'gatsby-plugin-catch-links',
		'gatsby-plugin-twitter',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: config.site.name,
				short_name: config.site.titleAbridged,
				description: config.site.description,
				start_url: adjustedPathPRefix,
				background_color: config.site.backgroundColor,
				theme_color: config.site.themeColor,
				display: 'minimal-ui',
				cache_busting_mode: 'none',
				icon: config.iconPath,
				icons: config.iconList
			}
		},
		{
			resolve: 'gatsby-plugin-offline',
			options: {
				workboxConfig: {
					globPatterns: config.iconCachePaths
				}
			}
		},

		{
			resolve: 'gatsby-plugin-feed',
			options: {
				setup: setupRssFeed(config),
				query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }
      `,
				feeds: [
					{
						serialize: generateRssFeed(config),
						query: `
            {
              allMdx(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___datePublished] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    timeToRead
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      datePublished
                      category
                      tags
                    }
                  }
                }
              }
            }
          `,
						output: withBasePath(config, config.site.rss),
						title: config.site.rssTitle,
						site_url: config.site.url
					}
				]
			}
		},
		'gatsby-plugin-styled-components'
	]
};

export default gatsbyConfig;
