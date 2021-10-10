import { SEO } from '../index';
import { config, post } from '../../../../__tests__/fixtures';

jest.mock('../../../config/useConfig', () => ({
	useConfig: jest.fn(() => config)
}));

describe('component SEO', () => {
	it('renders correctly for posts', () => {
		const seoData = SEO({ post });

		expect(seoData).toMatchSnapshot();
	});

	it('renders correctly on pages', () => {
		const seoData = SEO({});

		expect(seoData).toMatchSnapshot();
	});
});
