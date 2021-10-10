import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import 'jest-styled-components';

import { generateHeadings } from '../Text';
import { config } from '../../../../../__tests__/fixtures';

jest.mock('../../../../config/useConfig', () => ({
	useConfig: jest.fn(() => config)
}));

describe('utility `generateHeadings`', () => {
	it('generates linked heading components for markdown content', () => {
		const headings = generateHeadings('/test');

		Object.values(headings).forEach((heading) => {
			const HeadingComponent = heading;

			render(<HeadingComponent>Test</HeadingComponent>);

			const headingLink = screen.getByRole('link', {
				name: 'Test'
			});

			expect(headingLink).toHaveAttribute('href', '/test#test');

			cleanup();
		});
	});
});
