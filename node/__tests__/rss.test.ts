import { mocked } from 'ts-jest/utils';

import { generateRssFeed, setupRssFeed } from '../';
import { config, postQueryResult } from '../../test/fixtures';

import type { FeedQueryResult, FeedPluginData } from '../types';
jest.spyOn(global.console, 'warn').mockImplementation();

const mockedConsole = mocked(global.console, true);

const testQuery = {
	...postQueryResult,
	site: {
		siteMetadata: {
			rssMetadata: {
				generator: 'Test'
			}
		}
	}
} as unknown as FeedQueryResult;

const testFeedData: FeedPluginData = {
	title: 'test',
	site_url: 'https://example.com/',
	plugins: [],
	generator: 'TestGen',
	output: '',
	feeds: [],
	query: testQuery
};

const statefulSetup = setupRssFeed(config);

describe('rss build util `generateRssFeed`', () => {
	it('correctly maps graphql data to a feed', () => {
		const serialize = generateRssFeed(config);

		const serializedData = serialize(testFeedData);

		expect(serializedData).toMatchSnapshot();
	});

	it('logs a warning when no items are returned by the query', () => {
		const serialize = generateRssFeed(config);

		serialize({ ...testFeedData, query: {} });

		expect(mockedConsole.warn).toHaveBeenCalled();
	});
});

describe('rss build util `setupRssFeed`', () => {
	it('sets the correct feed generator name', () => {
		const serializedData = statefulSetup(testFeedData);

		expect(serializedData.generator).toBe(
			config.site.url.replace('https://', '')
		);
	});

	it('throws when missing rssMetadata', () => {
		const throwFunc = () => statefulSetup({ ...testFeedData, query: {} });

		expect(throwFunc).toThrow();
	});
});
