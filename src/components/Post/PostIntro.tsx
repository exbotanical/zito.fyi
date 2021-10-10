import React from 'react';
import styled from 'styled-components';
import { getImage } from 'gatsby-plugin-image';

import { CoverImage } from './PostImage';
import { WidthWrapper } from './PostSpacing';
import { H1, Body } from '@/theme';
import { PostInfo } from '@/components/PostInfo';

import type { IPost } from '@/types';

interface IPostIntroProps {
	post: IPost;
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

export const PostIntro = ({ post }: IPostIntroProps): JSX.Element => {
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
				<CoverImage image={imgData} alt={post.coverImageAlt} />
			</Cover>
		</Wrapper>
	);
};
