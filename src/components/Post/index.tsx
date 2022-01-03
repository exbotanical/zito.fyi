import React from 'react';
import styled from 'styled-components';

import { PostIntro } from './PostIntro';
import { Render } from './Render';
import { PostShare } from './Share';

import type { IPost } from '@/types';

interface IPostProps {
	post: IPost;
}

const Wrapper = styled.main`
	display: grid;
	width: 100%;
	grid-gap: 24px;
	justify-items: center;
`;

export function Post({ post }: IPostProps): JSX.Element {
  return <Wrapper>
		<PostIntro post={post} />
		<Render post={post} />
		<PostShare post={post} />
	</Wrapper>
}
