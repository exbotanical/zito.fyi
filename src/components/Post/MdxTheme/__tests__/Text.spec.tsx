import { screen, cleanup } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { config } from '@test/fixtures';
import { generateHeadings } from '../Text';
import { RenderStyled } from '@test/utils/styled';

jest.mock('@/config/useConfig', () => ({
	useConfig: jest.fn(() => config)
}));

describe('utility `generateHeadings`', () => {
	it('generates linked heading components for markdown content', () => {
		const headings = generateHeadings('/test');

		Object.values(headings).forEach((heading) => {
			const HeadingComponent = heading;

			RenderStyled(<HeadingComponent>Test</HeadingComponent>);

			const headingLink = screen.getByRole('link', {
				name: 'Test'
			});

			expect(headingLink).toHaveAttribute('href', '/test#test');

			cleanup();
		});
	});
});
