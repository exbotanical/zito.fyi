import { defineConfig } from 'cypress'
import { parseStringPromise } from 'xml2js'

interface RssData {
  rss: {
    channel: RssChannel[]
  }
}

interface SiteMapData {
  urlset: {
    url: {
      loc: string[]
      changefreq: string[]
      priority: string[]
    }[]
  }
}

interface ParseSitemapArgs {
  siteUrl: string
  sitemapString: string
}

interface RssItem {
  link: string[]
}

interface RssChannel {
  link: string[]
  item: RssItem[]
}

export default defineConfig({
  fixturesFolder: false,
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: false,
  retries: 1,
  defaultCommandTimeout: 10000,

  e2e: {
    baseUrl: 'http://localhost:9000',
    specPattern: 'cypress/e2e/**/*.test.{ts,tsx}',
    setupNodeEvents(on) {
      on('task', {
        async parseRss(rssString: string) {
          return parseStringPromise(rssString).then(res => {
            const rssData = res as RssData
            const items = rssData.rss.channel[0].item
            const siteUrl = rssData.rss.channel[0].link[0]

            return items.map(item => item.link[0].replace(siteUrl, ''))
          })
        },

        async parseSitemap({ siteUrl, sitemapString }: ParseSitemapArgs) {
          return parseStringPromise(sitemapString).then(res => {
            const siteMapData = res as SiteMapData
            const urls = siteMapData.urlset.url

            return urls.map(url => url.loc[0].replace(siteUrl, ''))
          })
        },
      })
    },
  },
})
