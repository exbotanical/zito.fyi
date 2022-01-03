import React from 'react';
import styled from 'styled-components';

import type { IPostBySlugQueryResult, IPostJson } from '@/types';

import { Layout } from '@/components/Layout';
import { Post } from '@/components/Post';
import { RelatedPosts } from '@/components/RelatedPosts';
import { jsonToPost, queryToPost } from '@/utils';


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

export function PostTemplate({
	data,
	pageContext
}: IPostTemplateProps): JSX.Element {
	const post = queryToPost(data);

	return (
		<Layout post={post}>
			<Wrapper>
				<Post post={post} />
				<RelatedPosts posts={pageContext.relatedPosts.map(jsonToPost)} />
			</Wrapper>
		</Layout>
	);
}
