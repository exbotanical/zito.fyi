import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import styled from 'styled-components';

import { MDXTheme } from './MdxTheme';
import { WrapperCss } from './PostSpacing';

import type { IPost } from '@/types';

interface IRenderProps {
	post: IPost;
}

const Wrapper = styled.article`
	width: 100%;
	max-width: 100%;
	overflow-x: auto;

	/* center and space child els */
	& > * {
		margin-right: auto;
		margin-bottom: 24px;
		margin-left: auto;
	}

	/* apply generic width rules to everything save for images, separators, containers */
	& > *:not(figure, div, hr) {
		${WrapperCss}
	}

	/* apply margins for headings */
	& > h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 36px;
		margin-bottom: 16px;
	}

	/* remove bottom margin from the last child */
	& > *:last-child {
		margin-bottom: 0;
	}
`;

export function Render({ post }: IRenderProps): JSX.Element {
	if (!post.body) {
		throw Error(
			`[Render] post data does not contain MDX body for rendering. Slug: ${post.slug}`
		);
	}

	return (
		<Wrapper>
			<MDXTheme post={post}>
				<MDXRenderer>{post.body}</MDXRenderer>
			</MDXTheme>
		</Wrapper>
	);
}
