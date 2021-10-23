import React from 'react';
import styled from 'styled-components';

import { jsonToPost, queryToPost } from '@/utils';

import { Layout } from '@/components/Layout';
import { Post } from '@/components/Post';
import { RelatedPosts } from '@/components/RelatedPosts';

import type { IPostBySlugQueryResult, IPostJson } from '@/types';

interface IPageContext {
	relatedPosts: IPostJson[];
}

interface IPostTemplateProps {
	data: IPostBySlugQueryResult;
	pageContext: IPageContext;
}

const Wrapper = styled.div`
	display: grid;
	grid-gap: 60px;
`;

export const PostTemplate = ({
	data,
	pageContext
}: IPostTemplateProps): JSX.Element => {
	const post = queryToPost(data);

	return (
		<Layout post={post}>
			<Wrapper>
				<Post post={post} />
				<RelatedPosts posts={pageContext.relatedPosts.map(jsonToPost)} />
			</Wrapper>
		</Layout>
	);
};
