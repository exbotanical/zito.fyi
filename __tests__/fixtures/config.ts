import type { ISiteConfig } from '../../src/types';

export const config: ISiteConfig = {
	site: {
		title: "Matthew Zito's Blog",
		titleAbridged: "Zito's Blog",
		name: "Matthew Zito's Blog",
		description: "Matthew Zito's Blog About Software and Programming",
		language: 'en',
		logoUrl: '',
		facebookAppId: '',
		twitterHandle: 'test',
		url: 'https://zito.dev',
		rss: '/rss.xml',
		rssTitle: "Matthew Zito's Blog RSS Feed",
		googleAnalyticsId: '',
		copyright: '© Copyright 2021 | Matthew Zito',
		themeColor: '#D83850',
		backgroundColor: '#F7F7F7'
	},
	user: {
		id: 'goldmund',
		firstName: 'Matthew',
		surname: 'Zito',
		twitterHandle: 'test',
		linkedIn: 'matthew-zito-9a03b3127',
		github: 'MatthewZito',
		email: 'exbotanical@gmail.com',
		location: 'United States',
		about: 'A paragraph about me, the author and site admin.',
		avatar: 'https://i.ibb.co/LNJDFXV/self.png'
	},
	organization: {
		name: '',
		description: '',
		logoUrl: '',
		url: 'https://zito.dev'
	},
	pathPrefix: '',
	embeddedImageWidth: 768,
	embeddedVideoWidth: 920,
	iconList: [],
	basePath: ''
};
