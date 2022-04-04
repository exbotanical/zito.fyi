import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import 'jest-styled-components';

import FeedTemplate from '..';
import { config } from '@test/fixtures';
import Index0 from '@test/fixtures/feedMetadata/index-0.json';
import { renderWithQueryClient } from '@test/utils/render';

import type { FeedMetadataJson } from '@/types';
import type { PageContext } from '../types';

jest.mock('@/config/useConfig', () => ({
	useConfig: jest.fn(() => config)
}));

const indexFeedContext = {
	feedId: undefined,
	feedMetadata: Index0 as unknown as FeedMetadataJson,
	feedType: 'index',
	pageCount: 3,
	pageIndex: 0
};

const categoryFeedContext = {
	feedId: 'test',
	feedMetadata: Index0 as unknown as FeedMetadataJson,
	feedType: 'category',
	pageCount: 3,
	pageIndex: 0
};

const tagFeedContext = {
	feedId: 'test',
	feedMetadata: Index0 as unknown as FeedMetadataJson,
	feedType: 'tag',
	pageCount: 3,
	pageIndex: 0
};

describe('page template FeedTemplate', () => {
	it('sets the correct title', () => {
		const assertTitle = (context: PageContext, expectedTitle: string) => {
			renderWithQueryClient(<FeedTemplate pageContext={context} />);

			const helmet = Helmet.peek();

			expect(helmet.title).toStrictEqual(expectedTitle);

			cleanup();
		};

		assertTitle(indexFeedContext, config.site.title);
		assertTitle(
			categoryFeedContext,
			`Posts in category "test" | ${config.site.title}`
		);
		assertTitle(
			tagFeedContext,
			`Posts tagged as "test" | ${config.site.title}`
		);
	});

	it('renders feed posts', async () => {
		renderWithQueryClient(<FeedTemplate pageContext={indexFeedContext} />);

		const post1 = await screen.findByText('Lorem Ipsum 3001');
		expect(post1).toBeInTheDocument();

		const post2 = await screen.findByText('Lorem Ipsum 3000');
		expect(post2).toBeInTheDocument();

		const post3 = await screen.findByText('Andrea Zittel 2');
		expect(post3).toBeInTheDocument();

		const post4 = await screen.findByText('Andrea Zittel');
		expect(post4).toBeInTheDocument();

		const post5 = await screen.findByText('Lorem Ipsum 33');
		expect(post5).toBeInTheDocument();
	});
});
