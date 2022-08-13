import type { SiteConfig } from '@/types'

import { config as testConfig } from '../test/fixtures/config'

const isTestEnv = process.env.CYPRESS_SUPPORT || process.env.NODE_ENV === 'test'

export const config: SiteConfig = isTestEnv
  ? testConfig
  : {
      /**
       * Directory in which static assets will reside
       */
      assetDir: 'static',

      /**
       * Base path for pages
       */
      basePath: '/',

      /**
       * Directory in which MDX posts will reside
       */
      // TODO
      contentDir: 'content',

      /**
       * MDX-embedded image width; used for `gatsby-plugin-image` optimizations
       */
      embeddedImageWidth: 768,

      /**
       * MDX-embedded video width, in pixels
       */
      embeddedVideoWidth: 920,

      /**
       * Glob pattern for icons that will be cached by `gatsby-plugin-offline`
       */
      iconCachePaths: ['**/*.{png,svg,jpg,gif}'],

      /**
       * Icons used in the web manifest
       */
      iconList: [],

      /**
       * Manifest icon
       */
      iconPath: 'static/android-chrome-512x512.png',

      organization: {
        description: '',
        logoUrl: '',
        name: '',

        /**
         * Organization homepage
         */
        url: 'https://zito.dev',
      },

      /**
       * Prefix all URLs
       */
      pathPrefix: '/',

      site: {
        /**
         * Site manifest background color
         */
        backgroundColor: 'rgb(206, 166, 186)',

        /**
         * Copyright, as displayed in footer and RSS Feed
         */
        copyright: {
          name: 'Creative Commons Attributions 4.0 International License',
          link: 'https://creativecommons.org/licenses/by/4.0/',
        },

        /**
         * Site description; used for RSS feeds, description meta tag
         */
        description:
          "Matthew Zito's blog about software development and programming",

        /**
         * Facebook Application Id; used for app insights, Facebook-specific OpenGraph features
         */
        facebookAppId: '',

        /**
         * Google Analytics Tracking Id
         */
        googleAnalyticsId: '',

        /**
         * App-wide HTML lang attr
         */
        language: 'en',

        /**
         * Logo; used for SEO
         */
        logoUrl: '/android-chrome-512x512.png',

        /**
         * Site name as used for SEO, PWA home screen
         */
        name: "Matthew Zito's Blog",

        /**
         * RSS Feed filepath
         */
        rss: '/rss.xml',

        /**
         * RSS Feed title
         */
        rssTitle: "Matthew Zito's Blog RSS Feed",

        /**
         * App theme color base; used in site manifest
         */
        themeColor: 'rgb(100, 102, 140)',

        /**
         * Site title
         */
        title: "Matthew Zito's Blog",

        /**
         * Abridged site title. Used for PWA home screen icon. Approx 12 char maximum
         */
        titleAbridged: "Zito's Blog",

        /**
         * Twitter handle for the site
         */
        twitterHandle: 'exbotanical',

        /**
         * Site base domain
         */
        url: 'https://zito.dev',
      },
      // User configuration
      user: {
        /**
         * Admin 'author' section text
         */
        about:
          'Frontend software engineer and comp-sci enthusiast. I write source code reviews and blog about programming.',

        /**
         * Admin 'author' section avatar
         */
        avatar:
          'https://upload.wikimedia.org/wikipedia/en/e/e7/CanMonsterMovieAlbumCover.jpg',

        /**
         * Admin email addr; used for SEO, RSS Feed
         */
        email: 'exbotanical@gmail.com',

        /**
         * Admin first name; used for SEO
         */
        firstName: 'Matthew',

        /**
         * Admin GitHub username
         */
        github: 'exbotanical',

        /**
         * Unique identifier for the site admin; used in OpenGraph and SEO tags
         */
        id: 'goldmund',

        /**
         * Admin LinkedIn Id
         */
        linkedIn: 'matthew-zito-9a03b3127',

        /**
         * Admin location; used for SEO
         */
        location: 'United States',

        /**
         * Admin surname; used for SEO
         */
        surname: 'Zito',

        /**
         * Admin twitter handle
         */
        twitterHandle: 'exbotanical',
      },
    }
