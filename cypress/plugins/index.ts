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

const pluginConfig: Cypress.PluginConfig = on => {
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
    }
  })
}

export default pluginConfig
