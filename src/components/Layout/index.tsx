import React, { useState } from 'react';
import styled from 'styled-components';

import { ThemeProvider, breakpoints } from '@/theme';

import { SEO } from '@/components/SEO';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { LayoutWidthContainer } from '@/components/LayoutWidthContainer';

import type { IPost } from '@/types';

interface ILayoutProps {
	children?: React.ReactNode;
	post?: IPost;
}

const LayoutGrid = styled.div`
	display: grid;
	min-width: 100%;
	min-height: 100vh;
	align-content: space-between;
	padding-top: 16px;
	gap: 80px;
	grid-template-columns: 100%;

	@media (max-width: ${breakpoints.sm}) {
		gap: 40px;
	}
`;

export const Layout = ({ children, post }: ILayoutProps): JSX.Element => {
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');

	const toggleTheme = () =>
		setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
	return (
		<ThemeProvider theme={theme}>
			<SEO post={post} />
			<LayoutGrid>
				<LayoutWidthContainer>
					<Navigation theme={theme} setTheme={toggleTheme} />
				</LayoutWidthContainer>
				{children}
				<Footer />
			</LayoutGrid>
		</ThemeProvider>
	);
};
