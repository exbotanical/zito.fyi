import kebabCase from 'lodash.kebabcase';
import React from 'react';
import styled from 'styled-components';

import type { AnyStyledComponent } from 'styled-components';

import { HeadingLink } from '@/components/Links';
import { ExtendingWrapper } from '@/components/Post/PostSpacing';
import * as styles from '@/theme';

interface HeadingProps {
	children: React.ReactNode;
}

interface HeadingComponent {
	(props: HeadingProps): JSX.Element;
}

interface Headings {
	H1: HeadingComponent;
	H2: HeadingComponent;
	H3: HeadingComponent;
	H4: HeadingComponent;
	H5: HeadingComponent;
	H6: HeadingComponent;
}

interface BlockquoteProps {
	children?: React.ReactNode;
}

/**
 * @summary Extract header hashlink from child components
 */
const getHeaderHashLink = (children: React.ReactNode): string | null => {
	if (Array.isArray(children)) {
		return kebabCase(
			children.filter((child) => typeof child === 'string').join()
		);
	}

	if (typeof children === 'string') {
		return kebabCase(children);
	}

	return null;
};

/**
 * @summary Generate a heading component from a given slug and styled component
 */
const generateHeading = (
	slug: string,
	HeadingComponent: AnyStyledComponent
): HeadingComponent => {
	function GeneratedHeader({ children }: HeadingProps): JSX.Element {
		const hashLink = getHeaderHashLink(children);

		return hashLink ? (
			<HeadingComponent id={hashLink}>
				<HeadingLink to={`${slug}#${hashLink}`}>{children} </HeadingLink>
			</HeadingComponent>
		) : (
			<HeadingComponent>{children}</HeadingComponent>
		);
	}

	return GeneratedHeader;
};

const BlockquoteStyle = styled.blockquote`
	padding: 8px 16px;
	border-left: 8px solid var(--color-primary-300, rgb(207, 12, 0));
	background-color: var(--color-grey-200, rgb(3, 83, 99));
	color: var(--color-inverted-text, rgb(251, 248, 228));
`;

export const Paragraph = undefined;
export const generateHeadings = (slug: string): Headings => ({
	H1: generateHeading(slug, styles.H1),
	H2: generateHeading(slug, styles.H2),
	H3: generateHeading(slug, styles.H3),
	H4: generateHeading(slug, styles.H4),
	H5: generateHeading(slug, styles.H5),
	H6: generateHeading(slug, styles.H6)
});

export function Blockquote({ children }: BlockquoteProps): JSX.Element {
	return (
		<ExtendingWrapper>
			<BlockquoteStyle>{children}</BlockquoteStyle>
		</ExtendingWrapper>
	);
}
