import React from 'react';
import styled, { AnyStyledComponent } from 'styled-components';
import _ from 'lodash';

import * as styles from '@/theme';
import { ExtendingWrapper } from '@/components/Post/PostSpacing';
import { HeadingLink } from '@/components/Links';

interface IHeadingProps {
	children: React.ReactNode;
}

interface IHeadingComponent {
	(props: IHeadingProps): JSX.Element;
}

interface IHeadings {
	H1: IHeadingComponent;
	H2: IHeadingComponent;
	H3: IHeadingComponent;
	H4: IHeadingComponent;
	H5: IHeadingComponent;
	H6: IHeadingComponent;
}

interface IBlockquoteProps {
	children?: React.ReactNode;
}

/**
 * @summary Extract header hashlink from child components
 */
const getHeaderHashLink = (children: React.ReactNode): string | null => {
	if (Array.isArray(children)) {
		return _.kebabCase(
			children.filter((child) => typeof child === 'string').join()
		);
	}

	if (typeof children === 'string') {
		return _.kebabCase(children);
	}

	return null;
};

/**
 * @summary Generate a heading component from a given slug and styled component
 */
const generateHeading = (
	slug: string,
	HeadingComponent: AnyStyledComponent
): IHeadingComponent => {
	const GeneratedHeader = ({ children }: IHeadingProps): JSX.Element => {
		const hashLink = getHeaderHashLink(children);

		return hashLink ?
			(
				<HeadingComponent id={hashLink}>
					<HeadingLink to={`${slug}#${hashLink}`}>{children} </HeadingLink>
				</HeadingComponent>
			) :
			(
				<HeadingComponent>{children}</HeadingComponent>
			);
	};

	return GeneratedHeader;
};

const BlockquoteStyle = styled.blockquote`
	padding: 8px 16px;
	border-left: 8px solid var(--color-primary-300, rgb(207, 12, 0));
	background-color: var(--color-grey-200, rgb(3, 83, 99));
	color: var(--color-inverted-text, rgb(251, 248, 228));
`;

export const Paragraph = undefined;
export const generateHeadings = (slug: string): IHeadings => ({
	H1: generateHeading(slug, styles.H1),
	H2: generateHeading(slug, styles.H2),
	H3: generateHeading(slug, styles.H3),
	H4: generateHeading(slug, styles.H4),
	H5: generateHeading(slug, styles.H5),
	H6: generateHeading(slug, styles.H6)
});

export const Blockquote = ({ children }: IBlockquoteProps): JSX.Element => (
	<ExtendingWrapper>
		<BlockquoteStyle>{children}</BlockquoteStyle>
	</ExtendingWrapper>
);
