import path from 'path'

import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import remarkExternalLinks from 'remark-external-links'
// https://github.com/gatsbyjs/gatsby/issues/16239
// must be < v3 due to ESM only support therein
import unwrapImages from 'remark-unwrap-images'
import urljoin from 'url-join'

import { withBasePath, generateRssFeed, setupRssFeed } from '../node'

import { config } from '.'

import type { GatsbyConfig } from 'gatsby'

const adjustedPathPRefix = !config.pathPrefix ? '/' : config.pathPrefix
const gatsbyConfig: GatsbyConfig = {
  pathPrefix: adjustedPathPRefix,
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-react-svg',
    //   options: {
    //     rule: {
    //       include: /\.svg$/,
    //     },
    //   },
    // },
    {
      // https://github.com/jacobmischka/gatsby-plugin-react-svg/issues/59#issuecomment-2580080274
      resolve: 'gatsby-plugin-svgr-svgo',
      options: {
        inlineSvgOptions: [
          {
            test: /\.svg$/,
            // svgoConfig: {
            //   plugins: [
            //     {
            //       name: 'preset-default',
            //       params: {
            //         overrides: { removeViewBox: false },
            //       },
            //     },
            //     'prefixIds',
            //   ],
            // },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-react-helmet-canonical-urls',
      options: {
        siteUrl: config.site.url,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: path.join(__dirname, '../', config.assetDir || 'static'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.join(__dirname, '../', config.contentDir || 'content'),
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          backgroundColor: 'transparent',
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
        },
        failOnError: true,
      },
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
              width: config.embeddedVideoWidth,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          {
            resolve: 'gatsby-remark-relative-images-v2',
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: config.embeddedImageWidth,
              showCaptions: ['title', 'alt'],
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [unwrapImages, remarkA11yEmoji, remarkExternalLinks],
        },
      },
    },
    ...(config.site.googleAnalyticsId
      ? [
          {
            resolve: 'gatsby-plugin-google-gtag',
            options: {
              trackingIds: [config.site.googleAnalyticsId],
            },
          },
        ]
      : []),
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        background_color: config.site.backgroundColor,
        cache_busting_mode: 'none',
        description: config.site.description,
        display: 'minimal-ui',
        icon: config.iconPath,
        // `icons` overrides `icon` - must use one or the other
        // icons: config.iconList,
        name: config.site.name,
        short_name: config.site.titleAbridged,
        start_url: adjustedPathPRefix,
        theme_color: config.site.themeColor,
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: config.iconCachePaths,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            output: withBasePath(config, config.site.rss),
            query: `{
              allMdx(limit: 1000, sort: {frontmatter: {datePublished: DESC}}) {
                edges {
                  node {
                    html
                    timeToRead {
                      text
                    }
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
            }`,
            serialize: generateRssFeed(config),
            site_url: config.site.url,
            title: config.site.rssTitle,
          },
        ],
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
        setup: setupRssFeed(config),
      },
    },
    'gatsby-plugin-styled-components',
  ],
  siteMetadata: {
    config,
    rssMetadata: {
      copyright: `Licensed under ${config.site.copyright.name}`,
      description: config.site.description,
      feed_url: urljoin(config.site.url, config.pathPrefix, config.site.rss),
      image_url: `${urljoin(config.site.url, config.pathPrefix)}${
        config.site.logoUrl
      }`,
      site_url: urljoin(config.site.url, config.pathPrefix),
      title: config.site.title,
    },
    siteUrl: urljoin(config.site.url, config.pathPrefix),
  },
}

export default gatsbyConfig
