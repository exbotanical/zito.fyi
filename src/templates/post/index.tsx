import React from 'react';
import styled from 'styled-components';

import type { PostBySlugQueryResult, PostJson } from '@/types';

import { Layout } from '@/components/Layout';
import { Post } from '@/components/Post';
import { RelatedPosts } from '@/components/RelatedPosts';
import { jsonToPost, queryToPost } from '@/utils';

interface PageContext {
	relatedPosts: PostJson[];
}

interface PostTemplateProps {
	data: PostBySlugQueryResult;
	pageContext: PageContext;
}

const Wrapper = styled.div`
	display: grid;
	grid-gap: 60px;
`;

export function PostTemplate({
	data,
	pageContext
}: PostTemplateProps): JSX.Element {
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
