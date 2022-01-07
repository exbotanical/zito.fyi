import React from 'react';
import styled from 'styled-components';

import type { Post } from '@/types';

import { Footer } from '@/components/Footer';
import { LayoutWidthContainer } from '@/components/LayoutWidthContainer';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { ThemeProvider, BREAKPOINTS } from '@/theme';

interface LayoutProps {
	children?: React.ReactNode;
	post?: Post;
}

const LayoutGrid = styled.div`
	display: grid;
	min-width: 100%;
	min-height: 100vh;
	align-content: space-between;
	padding-top: 16px;
	gap: 80px;
	grid-template-columns: 100%;

	@media (max-width: ${BREAKPOINTS.sm}) {
		gap: 40px;
	}
`;

export function Layout({ children, post }: LayoutProps): JSX.Element {
	return (
		<ThemeProvider>
			{/* eslint-disable-next-line react/jsx-pascal-case */}
			<SEO post={post} />
			<LayoutGrid>
				<LayoutWidthContainer>
					<Navigation />
				</LayoutWidthContainer>
				{children}
				<Footer />
			</LayoutGrid>
		</ThemeProvider>
	);
}
