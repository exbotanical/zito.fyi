import { screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { config, post } from '@@/fixtures';
import { RenderStyled } from '@@/utils/styled';

import { PostInfo } from '../index';

jest.mock('@/config/useConfig', () => ({
	useConfig: jest.fn(() => config)
}));

describe('`PostInfo` component', () => {
	it('generates correct tag/category URLs', async () => {
		RenderStyled(<PostInfo post={post} />);

		const categoryLink = await screen.findByRole('link', {
			name: 'technology'
		});
		expect(categoryLink).toHaveAttribute('href', '/category/technology');

		const tagLink1 = await screen.findByRole('link', { name: 'programming' });
		expect(tagLink1).toHaveAttribute('href', '/tag/programming');

		const tagLink2 = await screen.findByRole('link', { name: 'javascript' });
		expect(tagLink2).toHaveAttribute('href', '/tag/javascript');
	});

	it('shows correct information span', async () => {
		RenderStyled(<PostInfo post={post} />);

		// TODO fix dates so we don't need to do this
		// but for now, due to local OS tz, the date will be different
		// locally versus in GitHub's task runner
		const infoSpan = await screen.findByText(/⋅ Jan [0-9], 2021 ⋅ 3 min read/);

		expect(infoSpan).toBeInTheDocument();
	});
});
