import { TwitterTags } from '../Twitter';

import { tagListHasEmptyValues, tagListHasUniqueKeys, seoData } from './utils';

describe('`TwitterTags`', () => {
	it('generates correct tags for pages', () => {
		const generatedTags = TwitterTags({
			seoData: seoData.seoSite,
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags for posts', () => {
		const generatedTags = TwitterTags({
			seoData: seoData.seoPost,
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when `description` is not extant', () => {
		const generatedTags = TwitterTags({
			seoData: { ...seoData.seoPost, description: undefined },
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when `imageUrl` is not extant', () => {
		const generatedTags = TwitterTags({
			seoData: { ...seoData.seoPost, imageUrl: undefined },
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('does not generate empty tags', () => {
		const siteTags = TwitterTags({
			seoData: seoData.seoSite,
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(tagListHasEmptyValues(siteTags)).toBe(false);

		const postTags = TwitterTags({
			seoData: seoData.seoPost,
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(tagListHasEmptyValues(postTags)).toBe(false);

		const tagsSansUserTwitter = TwitterTags({
			seoData: seoData.seoPost,
			userData: { ...seoData.user, twitterHandle: undefined },
			siteData: seoData.site
		});

		expect(tagListHasEmptyValues(tagsSansUserTwitter)).toBe(false);

		const tagsSansSitetwitterHandle = TwitterTags({
			seoData: seoData.seoPost,
			userData: seoData.user,
			siteData: { ...seoData.site, twitterHandle: undefined }
		});

		expect(tagListHasEmptyValues(tagsSansSitetwitterHandle)).toBe(false);

		const tagsSansDescription = TwitterTags({
			seoData: { ...seoData.seoPost, description: undefined },
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(tagListHasEmptyValues(tagsSansDescription)).toBe(false);

		const tagsSansImageUrl = TwitterTags({
			seoData: { ...seoData.seoPost, imageUrl: undefined },
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(tagListHasEmptyValues(tagsSansImageUrl)).toBe(false);
	});

	it('generates unique keys', () => {
		const generatedSiteTags = TwitterTags({
			seoData: seoData.seoSite,
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(tagListHasUniqueKeys(generatedSiteTags)).toBe(true);

		const generatedpostTags = TwitterTags({
			seoData: seoData.seoPost,
			userData: seoData.user,
			siteData: seoData.site
		});

		expect(tagListHasUniqueKeys(generatedpostTags)).toBe(true);
	});
});
