import type { SiteConfig } from '@/types'

export const config: SiteConfig = {
  assetDir: 'static',
  contentDir: 'test/fixtures/content',
  basePath: '/',
  pathPrefix: '/',

  site: {
    title: "Matthew Zito's Blog",
    titleAbridged: "Zito's Blog",
    name: "Matthew Zito's Blog",
    description: "Matthew Zito's Blog About Software and Programming",
    language: 'en',
    logoUrl: '',
    facebookAppId: '',
    twitterHandle: 'test',
    url: 'https://zito.fyi',
    rss: '/rss.xml',
    rssTitle: "Matthew Zito's Blog RSS Feed",
    googleAnalyticsId: '',
    copyright: {
      name: 'Creative Commons Attributions 4.0 International License',
      link: 'https://creativecommons.org/licenses/by/4.0/',
    },
    themeColor: '#D83850',
    backgroundColor: '#F7F7F7'
  },
  user: {
    about:
      "I'm a frontend software developer and comp-sci enthusiast. I write source code reviews and blog about reactive programming, linux, C and JavaScript.",
    avatar:
      'https://upload.wikimedia.org/wikipedia/en/e/e7/CanMonsterMovieAlbumCover.jpg',

    email: 'exbotanical@protonmail.com',
    firstName: 'Matthew',
    github: 'exbotanical',
    id: 'goldmund',
    linkedIn: 'matthew-zito-9a03b3127',
    location: 'United States',
    surname: 'Zito',
    twitterHandle: 'exbotanical'
  },
  organization: {
    name: '',
    description: '',
    logoUrl: '',
    url: 'https://zito.fyi'
  },
  embeddedImageWidth: 768,
  embeddedVideoWidth: 920,
  iconList: [],
  iconPath: 'static/android-chrome-512x512.png'
}
