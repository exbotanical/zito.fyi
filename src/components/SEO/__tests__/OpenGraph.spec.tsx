import { OpenGraphTags } from '../OpenGraph';

import {
	tagListHasEmptyValues,
	sampleSeoData,
	tagListHasUniqueKeys
} from './utils';

describe('`OpenGraphTags`', () => {
	it('generates correct tags for pages', () => {
		const generatedTags = OpenGraphTags({
			seoData: sampleSeoData.seoSite,
			siteData: sampleSeoData.site,
			userData: sampleSeoData.user
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags for posts', () => {
		const generatedTags = OpenGraphTags({
			seoData: sampleSeoData.seoPost,
			siteData: sampleSeoData.site,
			userData: sampleSeoData.user,
			postData: sampleSeoData.post
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when missing `description`', () => {
		const generatedTags = OpenGraphTags({
			seoData: { ...sampleSeoData.seoPost, description: undefined },
			siteData: sampleSeoData.site,
			userData: sampleSeoData.user,
			postData: sampleSeoData.post
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when missing user data', () => {
		const generatedTags = OpenGraphTags({
			seoData: sampleSeoData.seoPost,
			siteData: sampleSeoData.site,
			userData: undefined,
			postData: sampleSeoData.post
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('does not generate tags when missing SEO `imageUrl`', () => {
		const generatedTags = OpenGraphTags({
			seoData: { ...sampleSeoData.seoPost, imageUrl: undefined },
			siteData: sampleSeoData.site,
			userData: sampleSeoData.user,
			postData: sampleSeoData.post
		});

		expect(generatedTags).toStrictEqual([]);
	});

	it('does not generate empty tags', () => {
		const generatedSiteTags = OpenGraphTags({
			seoData: sampleSeoData.seoSite,
			siteData: sampleSeoData.site,
			userData: sampleSeoData.user
		});

		expect(tagListHasEmptyValues(generatedSiteTags)).toBe(false);

		const generatedPostTags = OpenGraphTags({
			seoData: sampleSeoData.seoPost,
			siteData: sampleSeoData.site,
			userData: sampleSeoData.user,
			postData: sampleSeoData.post
		});

		expect(tagListHasEmptyValues(generatedPostTags)).toBe(false);

		const generatePostTagsSansFbAppId = OpenGraphTags({
			seoData: sampleSeoData.seoPost,
			siteData: { ...sampleSeoData.site, facebookAppId: undefined },
			userData: sampleSeoData.user,
			postData: sampleSeoData.post
		});

		expect(tagListHasEmptyValues(generatePostTagsSansFbAppId)).toBe(false);

		const generatedPostTagsSansDescription = OpenGraphTags({
			seoData: { ...sampleSeoData.seoPost, description: undefined },
			siteData: sampleSeoData.site,
			userData: sampleSeoData.user,
			postData: sampleSeoData.post
		});

		expect(tagListHasEmptyValues(generatedPostTagsSansDescription)).toBe(false);

		const generatedTagsWithoutUserData = OpenGraphTags({
			seoData: sampleSeoData.seoPost,
			siteData: sampleSeoData.site,
			userData: undefined,
			postData: sampleSeoData.post
		});

		expect(tagListHasEmptyValues(generatedTagsWithoutUserData)).toBe(false);
	});

	it('generates unique keys', () => {
		const generatedSiteTags = OpenGraphTags({
			seoData: sampleSeoData.seoSite,
			siteData: sampleSeoData.site,
			userData: sampleSeoData.user
		});

		expect(tagListHasUniqueKeys(generatedSiteTags)).toBe(true);

		const generatedPostTags = OpenGraphTags({
			seoData: sampleSeoData.seoPost,
			siteData: sampleSeoData.site,
			userData: sampleSeoData.user,
			postData: sampleSeoData.post
		});

		expect(tagListHasUniqueKeys(generatedPostTags)).toBe(true);
	});
});
