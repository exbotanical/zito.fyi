import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { config, post } from '../../../../__tests__/fixtures';
import { PostInfo } from '../index';

jest.mock('../../../config/useConfig', () => ({
	useConfig: jest.fn(() => config)
}));

describe('`PostInfo` component', () => {
	it('generates correct tag/category URLs', async () => {
		render(<PostInfo post={post} />);

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
		render(<PostInfo post={post} />);

		const infoSpan = await screen.findByText('⋅ Jan 5, 2021 ⋅ 3 min read');

		expect(infoSpan).toBeInTheDocument();
	});
});
