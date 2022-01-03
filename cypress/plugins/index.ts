import { parseStringPromise } from 'xml2js';

interface IRssData {
	rss?: {
		channel?: { link?: string[]; item?: { link?: string[] }[] }[];
	};
}

interface ISiteMapData {
	urlset?: {
		url?: { loc?: string[] }[];
	};
}

interface IParseSitemapArgs {
	siteUrl: string;
	sitemapString: string;
}

const pluginConfig: Cypress.PluginConfig = (on) => {
	on('task', {
		async parseRss (rssString: string) {
			return parseStringPromise(rssString).then((res) => {
				const rssData = res as IRssData;

				const items = rssData.rss.channel[0].item;
				// TODO
				console.log({ items },rssData.rss);

				const siteUrl = rssData.rss.channel[0].link[0];
				console.log({ items },rssData.rss);

				return items.map((item) => item.link[0].replace(siteUrl, ''));
			});
		},

		async parseSitemap ({ siteUrl, sitemapString }: IParseSitemapArgs) {
			return parseStringPromise(sitemapString).then((res) => {
				const siteMapData = res as ISiteMapData;

				const urls = siteMapData.urlset.url;
				// TODO
				console.log({ siteMapData, urls });
				return urls.map((url) => url.loc[0].replace(siteUrl, ''));
			});
		}
	});
};

export default pluginConfig;
