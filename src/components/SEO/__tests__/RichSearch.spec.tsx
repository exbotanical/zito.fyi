import {
	getAuthorMetadata,
	getOrgMetadata,
	getPostMetadata,
	RichSearchTags
} from '../RichSearch';

import {
	tagListHasEmptyValues,
	sampleSeoData,
	containsEmptyValues
} from './utils';

describe('seo module RichSearchTags', () => {
	it('generates correct tags for pages', () => {
		const generatedTags = RichSearchTags({
			seoData: sampleSeoData.seoSite,
			userData: sampleSeoData.user,
			orgData: sampleSeoData.organization
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags for posts', () => {
		const generatedTags = RichSearchTags({
			seoData: sampleSeoData.seoPost,
			postData: sampleSeoData.post,
			userData: sampleSeoData.user,
			orgData: sampleSeoData.organization
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('does not generate tags when missing post `coverImageUrl`', () => {
		const generatedTags = RichSearchTags({
			seoData: sampleSeoData.seoPost,
			postData: { ...sampleSeoData.post, coverImageUrl: undefined },
			userData: sampleSeoData.user,
			orgData: sampleSeoData.organization
		});
		expect(generatedTags).toStrictEqual([]);
	});

	it('does not generate tags when missing post `description`', () => {
		const generatedTags = RichSearchTags({
			seoData: sampleSeoData.seoPost,
			postData: { ...sampleSeoData.post, description: undefined },
			userData: sampleSeoData.user,
			orgData: sampleSeoData.organization
		});

		expect(generatedTags).toStrictEqual([]);
	});

	it('generates correct tags when missing user metadata', () => {
		const generatedTags = RichSearchTags({
			seoData: sampleSeoData.seoPost,
			postData: sampleSeoData.post,
			userData: undefined,
			orgData: sampleSeoData.organization
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when missing org data', () => {
		const generatedTags = RichSearchTags({
			seoData: sampleSeoData.seoPost,
			postData: sampleSeoData.post,
			userData: sampleSeoData.user,
			orgData: undefined
		});

		expect(generatedTags).toMatchSnapshot();
	});

	it('does not generate empty tags', () => {
		const generatedSiteTags = RichSearchTags({
			seoData: sampleSeoData.seoSite,
			userData: sampleSeoData.user,
			orgData: sampleSeoData.organization
		});

		expect(tagListHasEmptyValues(generatedSiteTags)).toBe(false);

		const generatedPostTags = RichSearchTags({
			seoData: sampleSeoData.seoPost,
			postData: sampleSeoData.post,
			userData: sampleSeoData.user,
			orgData: sampleSeoData.organization
		});

		expect(tagListHasEmptyValues(generatedPostTags)).toBe(false);

		const generatedPostTagsWithoutUserData = RichSearchTags({
			seoData: sampleSeoData.seoPost,
			postData: sampleSeoData.post,
			userData: undefined,
			orgData: sampleSeoData.organization
		});

		expect(tagListHasEmptyValues(generatedPostTagsWithoutUserData)).toBe(false);

		const generatedTagsWithoutOrgData = RichSearchTags({
			seoData: sampleSeoData.seoPost,
			postData: sampleSeoData.post,
			userData: sampleSeoData.user,
			orgData: undefined
		});

		expect(tagListHasEmptyValues(generatedTagsWithoutOrgData)).toBe(false);
	});
});

describe('`RichSearchTags` utility `getAuthorMetadata`', () => {
	it('generates valid JSONLD', () => {
		const generatedTags = getAuthorMetadata(sampleSeoData.user);

		expect(containsEmptyValues(generatedTags)).toBe(false);

		expect(() => JSON.stringify(generatedTags)).not.toThrow(Error);
	});
});

describe('`RichSearchTags` utility `getOrgMetadata`', () => {
	it('generates valid JSON+LD', () => {
		const generatedTags = getOrgMetadata(sampleSeoData.organization);

		expect(containsEmptyValues(generatedTags)).toBe(false);

		expect(() => JSON.stringify(generatedTags)).not.toThrow(Error);
	});
});

describe('`RichSearchTags` utility `getPostMetadata`', () => {
	it('generates valid JSONLD', () => {
		const generatedTags = getPostMetadata(
			sampleSeoData.post,
			sampleSeoData.organization,
			sampleSeoData.user
		);

		expect(containsEmptyValues(generatedTags)).toBe(false);

		expect(() => JSON.stringify(generatedTags)).not.toThrow(Error);
	});
});
