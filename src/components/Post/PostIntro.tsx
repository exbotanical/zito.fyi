import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';

import { PostInfo } from '@/components/PostInfo';
import { H1, Body } from '@/styles';
import type { Post } from '@/types';

import { CoverImage } from './PostImage';
import { WidthWrapper } from './PostSpacing';

interface PostIntroProps {
	post: Post;
}

const Wrapper = styled.section`
	display: grid;
	width: 100%;
	grid-gap: 24px;
	justify-items: center;
`;

const Details = styled.div`
	display: grid;
	grid-gap: 24px;
`;

const Cover = styled.div`
	display: grid;
	width: 100%;
	grid-gap: 8px;
	justify-items: center;
`;

export function PostIntro({ post }: PostIntroProps): JSX.Element {
	if (!post.coverImg) {
		throw Error('[PostIntro] Cannot render `PostIntro` without `coverImg`');
	}

	const imgData = getImage(post.coverImg);

	if (!imgData) {
		throw Error('[PostIntro] `getImage` failed to resolve `post.coverImg`');
	}

	return (
		<Wrapper>
			<WidthWrapper>
				<Details>
					<H1>{post.title}</H1>
					<Body>{post.excerpt}</Body>
				</Details>
			</WidthWrapper>
			<Cover>
				<WidthWrapper>
					<PostInfo post={post} />
				</WidthWrapper>
				<CoverImage alt={post.coverImageAlt} image={imgData} />
			</Cover>
		</Wrapper>
	);
}
