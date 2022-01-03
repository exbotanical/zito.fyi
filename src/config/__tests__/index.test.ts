import { cloneDeep } from 'lodash';

import { withBasePath } from '../../../config/utils';
import { config as mockConfig } from '../../../test/fixtures/config';

import type { ISiteConfig } from '../../types';

describe('configuration util `withBasePath`', () => {
	it('correctly adds the basePath to the URL', () => {
		const config = cloneDeep<ISiteConfig>(mockConfig);
		config.basePath = '/base';

		const fullUrl = withBasePath(config, '/test/url');

		expect(fullUrl).toBe('/base/test/url');
	});

	it('does not add the basePath if not specified', () => {
		const config = cloneDeep<ISiteConfig>(mockConfig);
		config.basePath = undefined;

		const fullUrl = withBasePath(config, '/test/url');

		expect(fullUrl).toBe('/test/url');
	});
});
