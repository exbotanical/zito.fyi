import * as xml2js from 'xml2js';

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
		parseRss (rssString: string) {
			return xml2js.parseStringPromise(rssString).then((res) => {
				const rssData = res as IRssData;

				const items = rssData?.rss?.channel[0]?.item;

				const siteUrl = rssData.rss.channel[0].link[0];

				return items.map((item) => item.link[0].replace(siteUrl, ''));
			});
		},

		parseSitemap ({ siteUrl, sitemapString }: IParseSitemapArgs) {
			return xml2js.parseStringPromise(sitemapString).then((res) => {
				const siteMapData = res as ISiteMapData;

				const urls = siteMapData.urlset.url;

				return urls.map((url) => url.loc[0].replace(siteUrl, ''));
			});
		}
	});
};

export default pluginConfig;
