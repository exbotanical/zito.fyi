import { GeneralTags } from '../General';
import { tagListHasEmptyValues, seoData } from './utils';

describe('`GeneralTags`', () => {
	it('generates correct tags on pages', () => {
		const generatedTags = GeneralTags(seoData.seoSite, seoData.site);

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags for posts', () => {
		const generatedTags = GeneralTags(seoData.seoPost, seoData.site);

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when missing `description`', () => {
		const generatedTags = GeneralTags(
			{ ...seoData.seoPost, description: undefined },
			seoData.site
		);

		expect(generatedTags).toMatchSnapshot();
	});

	it('generates correct tags when missing `imageUrl`', () => {
		const generatedTags = GeneralTags(
			{ ...seoData.seoPost, imageUrl: undefined },
			seoData.site
		);

		expect(generatedTags).toMatchSnapshot();
	});

	it('does not generate empty tags', () => {
		const generatedSiteTags = GeneralTags(seoData.seoSite, seoData.site);

		expect(tagListHasEmptyValues(generatedSiteTags)).toBe(false);

		const generatedPostTags = GeneralTags(seoData.seoPost, seoData.site);

		expect(tagListHasEmptyValues(generatedPostTags)).toBe(false);

		const generatedPostTagsWithMissingDesc = GeneralTags(
			{ ...seoData.seoPost, description: undefined },
			seoData.site
		);

		expect(tagListHasEmptyValues(generatedPostTagsWithMissingDesc)).toBe(false);

		const generatedPostTagsWithMissingImage = GeneralTags(
			{ ...seoData.seoPost, imageUrl: undefined },
			seoData.site
		);

		expect(tagListHasEmptyValues(generatedPostTagsWithMissingImage)).toBe(
			false
		);
	});
});
