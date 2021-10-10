import removeMd from 'remove-markdown';
import cloneDeep from 'clone-deep';

import { post as postFixture } from '../../../../__tests__/fixtures';
import { generatePostData, generateSeoData } from '../utils';
import { sampleSeoData } from './utils';

describe('sEO utility `generateSeoData`', () => {
	it('generates site SEO metadata', () => {
		const siteData = sampleSeoData.site;

		const seoData = generateSeoData(siteData);

		expect(seoData.title).toBe(siteData.title);
		expect(seoData.description).toBe(siteData.description);
		expect(seoData.url).toBe(siteData.url);
		expect(seoData.imageUrl).toBe(siteData.logoUrl);
		expect(seoData.imageAlt).toBe(siteData.description);
		expect(seoData.type).toBe('page');
		expect(seoData.isPost).toBe(false);
	});

	it('generates SEO metadata for posts', () => {
		const postData = sampleSeoData.post;

		const seoData = generateSeoData(sampleSeoData.site, postData);

		expect(seoData.title).toBe(postData.title);
		expect(seoData.description).toBe(postData.description);
		expect(seoData.url).toBe(postData.url);
		expect(seoData.imageUrl).toBe(postData.coverImageUrl);
		expect(seoData.imageAlt).toBe(postData.coverImageAlt);
		expect(seoData.type).toBe('post');
		expect(seoData.isPost).toBe(true);
	});
});

describe('seo utility `generatePostData`', () => {
	it('generates SEO metadata for posts', () => {
		const postData = generatePostData(postFixture);

		expect(postData.body).toBe(removeMd(postFixture.internalContent as string));
		expect(postData.category).toBe(postFixture.category);
		expect(postData.coverImageUrl).toBe(postFixture.coverImageUrl);
		expect(postData.coverImageAlt).toBe(postFixture.coverImageAlt);
		expect(postData.datePublished).toBe(postFixture.datePublished);
		expect(postData.dateModified).toBe(postFixture.dateModified);
		expect(postData.description).toBe(postFixture.description);
		expect(postData.tags).toBe(postFixture.tags);
		expect(postData.title).toBe(postFixture.title);
	});

	it('strips markdown formatting from the post content', () => {
		const post = cloneDeep(postFixture);

		post.internalContent = 'Content with [Markdown](/link).';

		const postData = generatePostData(post);

		expect(postData.body).toBe('Content with Markdown.');
	});

	it('falls back to post excerpt when no description is available', () => {
		const post = cloneDeep(postFixture);
		post.description = undefined;

		const postData = generatePostData(post);

		expect(postData.description).toBe(post.excerpt);
	});

	it('falls back to None when no category is available', () => {
		const post = cloneDeep(postFixture);
		post.category = undefined;

		const postData = generatePostData(post);

		expect(postData.category).toBe('None');
	});

	it('falls back to an empty list when no tags are available', () => {
		const post = cloneDeep(postFixture);
		post.tags = undefined;

		const postData = generatePostData(post);

		expect(postData.tags).toStrictEqual([]);
	});

	it('throws when internal content is not available', () => {
		const post = cloneDeep(postFixture);
		post.internalContent = undefined;

		const throwingFn = () => generatePostData(post);

		expect(throwingFn).toThrow();
	});
});
