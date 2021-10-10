import { TwitterTags } from '../Twitter';
import {
	tagListHasEmptyValues,
	tagListHasUniqueKeys,
	sampleSeoData
} from './utils';

describe('`TwitterTags`', () => {
	it('generates correct tags for pages', () => {
		const generatedTags = TwitterTags({
			seoData: sampleSeoData.seoSite,
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags for posts', () => {
		const generatedTags = TwitterTags({
			seoData: sampleSeoData.seoPost,
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when `description` is not extant', () => {
		const generatedTags = TwitterTags({
			seoData: { ...sampleSeoData.seoPost, description: undefined },
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when `imageUrl` is not extant', () => {
		const generatedTags = TwitterTags({
			seoData: { ...sampleSeoData.seoPost, imageUrl: undefined },
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('does not generate empty tags', () => {
		const siteTags = TwitterTags({
			seoData: sampleSeoData.seoSite,
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(tagListHasEmptyValues(siteTags)).toBe(false);

		const postTags = TwitterTags({
			seoData: sampleSeoData.seoPost,
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(tagListHasEmptyValues(postTags)).toBe(false);

		const tagsSansUserTwitter = TwitterTags({
			seoData: sampleSeoData.seoPost,
			userData: { ...sampleSeoData.user, twitterHandle: undefined },
			siteData: sampleSeoData.site
		});

		expect(tagListHasEmptyValues(tagsSansUserTwitter)).toBe(false);

		const tagsSansSitetwitterHandle = TwitterTags({
			seoData: sampleSeoData.seoPost,
			userData: sampleSeoData.user,
			siteData: { ...sampleSeoData.site, twitterHandle: undefined }
		});

		expect(tagListHasEmptyValues(tagsSansSitetwitterHandle)).toBe(false);

		const tagsSansDescription = TwitterTags({
			seoData: { ...sampleSeoData.seoPost, description: undefined },
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(tagListHasEmptyValues(tagsSansDescription)).toBe(false);

		const tagsSansImageUrl = TwitterTags({
			seoData: { ...sampleSeoData.seoPost, imageUrl: undefined },
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(tagListHasEmptyValues(tagsSansImageUrl)).toBe(false);
	});

	it('generates unique keys', () => {
		const generatedSiteTags = TwitterTags({
			seoData: sampleSeoData.seoSite,
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(tagListHasUniqueKeys(generatedSiteTags)).toBe(true);

		const generatedpostTags = TwitterTags({
			seoData: sampleSeoData.seoPost,
			userData: sampleSeoData.user,
			siteData: sampleSeoData.site
		});

		expect(tagListHasUniqueKeys(generatedpostTags)).toBe(true);
	});
});
