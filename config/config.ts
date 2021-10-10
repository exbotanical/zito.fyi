import type { ISiteConfig } from '../src/types';

export const config: ISiteConfig = {
	site: {
		/**
		 * Site title
		 */
		title: 'Matthew Zito\'s Blog',

		/**
		 * Abridged site title. Used for PWA home screen icon. Approx 12 char maximum
		 */
		titleAbridged: 'Zito\'s Blog',

		/**
		 * Site name as used for SEO, PWA home screen
		 */
		name: 'Matthew Zito\'s Blog',

		/**
		 * Site description; used for RSS feeds, description meta tag
		 */
		description: 'Matthew Zito\'s Blog About Software and Programming',

		/**
		 * App-wide HTML lang attr
		 */
		language: 'en',

		/**
		 * Logo; used for SEO
		 */
		logoUrl: '',

		/**
		 * Facebook Application Id; used for app insights, Facebook-specific OpenGraph features
		 */
		facebookAppId: '',

		/**
		 * Twitter handle for the site
		 */
		twitterHandle: 'test',

		/**
		 * Site base domain
		 */
		url: 'https://zito.dev',

		/**
		 * RSS Feed filepath
		 */
		rss: '/rss.xml',

		/**
		 * RSS Feed title
		 */
		rssTitle: 'Matthew Zito\'s Blog RSS Feed',

		/**
		 * Google Analytics Tracking Id
		 */
		googleAnalyticsId: '',

		/**
		 * Copyright, as displayed in footer and RSS Feed
		 */
		copyright: '© Copyright 2021 | Matthew Zito',

		/**
		 * App theme color base; used in site manifest
		 */
		themeColor: '#D83850',

		/**
		 * Site manifest background color
		 */
		backgroundColor: '#F7F7F7'
	},

	// User configuration
	user: {
		/**
		 * Unique identifier for the site admin; used in OpenGraph and SEO tags
		 */
		id: 'goldmund',

		/**
		 * Admin first name; used for SEO
		 */
		firstName: 'Matthew',

		/**
		 * Admin surname; used for SEO
		 */
		surname: 'Zito',

		/**
		 * Admin twitter handle
		 */
		twitterHandle: 'test',

		/**
		 * Admin LinkedIn Id
		 */
		linkedIn: 'matthew-zito-9a03b3127',

		/**
		 * Admin GitHub username
		 */
		github: 'MatthewZito',

		/**
		 * Admin email addr; used for SEO, RSS Feed
		 */
		email: 'exbotanical@gmail.com',

		/**
		 * Admin location; used for SEO
		 */
		location: 'United States',

		/**
		 * Admin 'author' section text
		 */
		about: 'A paragraph about me, the author and site admin.',

		/**
		 * Admin 'author' section avatar
		 */
		avatar: 'https://i.ibb.co/LNJDFXV/self.png'
	},

	organization: {
		name: '',
		description: '',
		logoUrl: '',

		/**
		 * Organization homepage
		 */
		url: 'https://zito.dev'
	},

	/**
	 * Prefix all URLs
	 */
	pathPrefix: '/',

	/**
	 * Directory in which MDX posts will reside
	 */
	// contentDir: '../content',
	// TODO
	contentDir: '../__tests__/fixtures/content',

	/**
	 * Directory in which static assets will reside
	 */
	// assetDir: '../static',
	assetDir: '../static',

	/**
	 * MDX-embedded image width; used for `gatsby-plugin-image` optimizations
	 */
	embeddedImageWidth: 768,

	/**
	 * MDX-embedded video width, in pixels
	 */
	embeddedVideoWidth: 920,

	/**
	 * Manifest icon
	 */
	iconPath: undefined,

	/**
	 * Icons used in the web manifest
	 */
	iconList: [],

	/**
	 * Glob pattern for icons that will be cached by `gatsby-plugin-offline`
	 */
	iconCachePaths: undefined,

	/**
	 * Base path for pages
	 */
	basePath: '/'
};
