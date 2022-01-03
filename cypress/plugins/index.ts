import { parseStringPromise } from 'xml2js';

interface IRssData {
	rss: {
		channel: IRssChannel[];
	};
}

interface ISiteMapData {
	urlset: {
		url: {
			loc: string[],
			changefreq: string[],
			priority: string[]
		}[];
	};
}

interface IParseSitemapArgs {
	siteUrl: string;
	sitemapString: string;
}

interface IRssItem {
	link: string[];
}

interface IRssChannel {
	link: string[];
	item: IRssItem[];
}

const pluginConfig: Cypress.PluginConfig = (on) => {
	on('task', {
		async parseRss (rssString: string) {
			return parseStringPromise(rssString).then((res) => {
				const rssData = res as IRssData;
				const items = rssData.rss.channel[0].item;
				const siteUrl = rssData.rss.channel[0].link[0];

				return items.map((item) => item.link[0].replace(siteUrl, ''));
			});
		},

		async parseSitemap ({ siteUrl, sitemapString }: IParseSitemapArgs) {
			return parseStringPromise(sitemapString).then((res) => {
				const siteMapData = res as ISiteMapData;
				const urls = siteMapData.urlset.url;

				return urls.map((url) => url.loc[0].replace(siteUrl, ''));
			});
		}
	});
};

export default pluginConfig;
