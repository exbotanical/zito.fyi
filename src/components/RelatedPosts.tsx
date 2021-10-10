import React from 'react';
import styled from 'styled-components';

import type { IPost } from '../types';
import { H2 } from '@/theme';
import { Feed } from '@/components/Feed';

interface IRelatedPostsProps {
	list: IPost[];
}

const Wrapper = styled.aside`
	display: grid;
	grid-gap: 40px;
	justify-items: center;
`;

const Label = styled(H2)`
	color: var(--color-grey-700);
	text-transform: uppercase;
`;

export const RelatedPosts = ({ list }: IRelatedPostsProps): JSX.Element => (
	<Wrapper>
		<Label>RELATED POSTS</Label>
		<Feed hideHero feedItems={list} />
	</Wrapper>
);
