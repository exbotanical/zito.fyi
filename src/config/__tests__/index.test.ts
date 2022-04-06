import cloneDeep from 'lodash.clonedeep';

import type { SiteConfig } from '@/types';

import { config as mockConfig } from '@@/fixtures/config';

import { withBasePath } from '../../../node';

describe('configuration util `withBasePath`', () => {
	it('correctly adds the basePath to the URL', () => {
		const config = cloneDeep<SiteConfig>(mockConfig);
		config.basePath = '/base';

		const fullUrl = withBasePath(config, '/test/url');

		expect(fullUrl).toBe('/base/test/url');
	});

	it('does not add the basePath if not specified', () => {
		const config = cloneDeep<SiteConfig>(mockConfig);
		config.basePath = undefined;

		const fullUrl = withBasePath(config, '/test/url');

		expect(fullUrl).toBe('/test/url');
	});
});
