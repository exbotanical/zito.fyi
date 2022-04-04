import cloneDeep from 'clone-deep';
import { mocked } from 'jest-mock';
import React from 'react';

import { post, config } from '@test/fixtures';
import { useConfig } from '@/config';
import { DisqusPlugin } from '../index';
import { RenderStyled } from '@test/utils/styled';

jest.mock('@/config/useConfig', () => ({
	useConfig: jest.fn(() => config)
}));

const mockedUseConfig = mocked(useConfig);

describe('component `DisqusPlugin`', () => {
	it('renders correctly when config.disqusShortname is set', () => {
		const newConfig = cloneDeep(config);
		newConfig.site.disqusShortname = '';

		mockedUseConfig.mockReturnValue(newConfig);

		const { asFragment } = RenderStyled(<DisqusPlugin post={post} />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('renders correctly when config.disqusShortname is not set', () => {
		const newConfig = cloneDeep(config);
		newConfig.site.disqusShortname = undefined;

		mockedUseConfig.mockReturnValue(newConfig);

		const { asFragment } = RenderStyled(<DisqusPlugin post={post} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
