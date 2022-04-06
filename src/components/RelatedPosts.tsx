import React from 'react';
import styled from 'styled-components';

import { Feed } from '@/components/Feed';
import { H2 } from '@/styles';

import type { Post } from '../types';

interface RelatedPostsProps {
	posts: Post[];
}

const Wrapper = styled.aside`
	display: grid;
	grid-gap: 40px;
	justify-items: center;
`;

const Label = styled(H2)`
	color: ${({ theme }) => theme.colors.link};
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
