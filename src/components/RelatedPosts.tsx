import React from 'react';
import styled from 'styled-components';

import type { Post } from '../types';

import { Feed } from '@/components/Feed';
import { H2 } from '@/theme';

interface RelatedPostsProps {
	posts: Post[];
}

const Wrapper = styled.aside`
	display: grid;
	grid-gap: 40px;
	justify-items: center;
`;

const Label = styled(H2)`
	color: var(--color-primary, rgb(0, 0, 0));
	text-transform: uppercase;
`;

export function RelatedPosts({ posts }: RelatedPostsProps): JSX.Element | null {
	return posts.length ? (
		<Wrapper>
			<Label>RELATED POSTS</Label>
			<Feed feedItems={posts} hideHero />
		</Wrapper>
	) : null;
}
