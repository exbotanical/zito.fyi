import React from 'react';
import styled from 'styled-components';

import type { Post as P } from '@/types';

import { PostIntro } from './PostIntro';
import { Render } from './Render';
import { PostShare } from './Share';

interface PostProps {
	post: P;
}

const Wrapper = styled.main`
	display: grid;
	width: 100%;
	grid-gap: 24px;
	justify-items: center;
`;

export function Post({ post }: PostProps): JSX.Element {
	return (
		<Wrapper>
			<PostIntro post={post} />
			<Render post={post} />
			<PostShare post={post} />
		</Wrapper>
	);
}
