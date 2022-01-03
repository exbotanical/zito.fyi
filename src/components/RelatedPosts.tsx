import React from 'react';
import styled from 'styled-components';

import type { IPost } from '../types';

import { Feed } from '@/components/Feed';
import { H2 } from '@/theme';

interface IRelatedPostsProps {
	posts: IPost[];
}

const Wrapper = styled.aside`
	display: grid;
	grid-gap: 40px;
	justify-items: center;
`;

const Label = styled(H2)`
	color: var(--color-grey-700, rgb(0, 0, 0));
	text-transform: uppercase;
`;

export function RelatedPosts({ posts }: IRelatedPostsProps): JSX.Element {
	return (
		<Wrapper>
			<Label>RELATED POSTS</Label>
			<Feed feedItems={posts} hideHero />
		</Wrapper>
	);
}
