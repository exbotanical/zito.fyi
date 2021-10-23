import React from 'react';
import styled from 'styled-components';

import type { IPost } from '../types';
import { H2 } from '@/theme';
import { Feed } from '@/components/Feed';

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

export const RelatedPosts = ({ posts }: IRelatedPostsProps): JSX.Element => {
	return (
		<Wrapper>
			<Label>RELATED POSTS</Label>
			<Feed hideHero feedItems={posts} />
		</Wrapper>
	);
};
