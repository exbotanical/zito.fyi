import { screen } from '@testing-library/react';
import React from 'react';
import { Helmet } from 'react-helmet';

import type { PostJson } from '@/types';

import { post, postQueryResult, config } from '@@/fixtures';
import { RenderStyled } from '@@/utils/styled';

import { PostTemplate } from '..';

const postFromJson = JSON.parse(JSON.stringify(post)) as PostJson;

const postData = postQueryResult;

const pageContext = {
	relatedPosts: [postFromJson, { ...postFromJson, slug: '/related-post' }]
};

const originalError = console.error.bind(console.error);

jest.mock('@/config/useConfig', () => ({
	useConfig: jest.fn(() => config)
}));

describe('`PostTemplate`', () => {
	beforeAll(() => {
		console.error = (msg) => {
			!msg.toString().includes('Warning: validateDOMNesting') &&
				originalError(msg);
		};
	});

	afterAll(() => {
		console.error = originalError;
	});

	it('renders the expected SEO tags', () => {
		RenderStyled(<PostTemplate data={postData} pageContext={pageContext} />);

		const helmet = Helmet.peek();

		expect(helmet.metaTags).toStrictEqual(
			expect.arrayContaining([
				{
					content: 'https://zito.dev/bold-mage',
					property: 'og:url'
				}
			])
		);
	});

	it('sets the correct title', () => {
		RenderStyled(<PostTemplate data={postData} pageContext={pageContext} />);

		const helmet = Helmet.peek();

		expect(helmet.title).toBe('Bold Mage');
	});

	it('renders the layout component', async () => {
		RenderStyled(<PostTemplate data={postData} pageContext={pageContext} />);

		const copyrightNotice = await screen.findByText(config.site.copyright);

		expect(copyrightNotice).toBeInTheDocument();
	});

	it('renders the post', async () => {
		RenderStyled(<PostTemplate data={postData} pageContext={pageContext} />);

		const post = await screen.findByRole('article');

		expect(post).toBeInTheDocument();
	});

	it('renders related posts', async () => {
		RenderStyled(<PostTemplate data={postData} pageContext={pageContext} />);

		const relatedPosts = await screen.findByText('RELATED POSTS');

		expect(relatedPosts).toBeInTheDocument();
	});
});
