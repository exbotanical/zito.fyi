import { GeneralTags } from '../General';
import { tagListHasEmptyValues, sampleSeoData } from './utils';

describe('`GeneralTags`', () => {
	it('generates correct tags on pages', () => {
		const generatedTags = GeneralTags(
			sampleSeoData.seoSite,
			sampleSeoData.site
		);

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags for posts', () => {
		const generatedTags = GeneralTags(
			sampleSeoData.seoPost,
			sampleSeoData.site
		);

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when missing `description`', () => {
		const generatedTags = GeneralTags(
			{ ...sampleSeoData.seoPost, description: undefined },
			sampleSeoData.site
		);

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when missing `imageUrl`', () => {
		const generatedTags = GeneralTags(
			{ ...sampleSeoData.seoPost, imageUrl: undefined },
			sampleSeoData.site
		);

		expect(generatedTags).toMatchSnapshot();
	});

	it('does not generate empty tags', () => {
		const generatedSiteTags = GeneralTags(
			sampleSeoData.seoSite,
			sampleSeoData.site
		);

		expect(tagListHasEmptyValues(generatedSiteTags)).toBe(false);

		const generatedPostTags = GeneralTags(
			sampleSeoData.seoPost,
			sampleSeoData.site
		);

		expect(tagListHasEmptyValues(generatedPostTags)).toBe(false);

		const generatedPostTagsWithMissingDesc = GeneralTags(
			{ ...sampleSeoData.seoPost, description: undefined },
			sampleSeoData.site
		);

		expect(tagListHasEmptyValues(generatedPostTagsWithMissingDesc)).toBe(false);

		const generatedPostTagsWithMissingImage = GeneralTags(
			{ ...sampleSeoData.seoPost, imageUrl: undefined },
			sampleSeoData.site
		);

		expect(tagListHasEmptyValues(generatedPostTagsWithMissingImage)).toBe(
			false
		);
	});
});
