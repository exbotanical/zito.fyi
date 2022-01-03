import { getImage } from 'gatsby-plugin-image';
import React from 'react';

import { PostButton } from './PostButton';
import { PostCardSkeleton } from './Skeleton';
import * as Styles from './styles';

import type { IPost } from '@/types';

import { TransparentLink } from '@/components/Links';
import { PostInfo } from '@/components/PostInfo';
import { H3 } from '@/theme/Primitives';

interface IPostCardProps {
	post?: IPost;
	hero?: boolean;
}

export function PostCard({ post, hero }: IPostCardProps): JSX.Element {
	if (!post) return <PostCardSkeleton />;

	if (!post.coverImg) {
		// TODO placeholder
		throw Error('Cannot render `PostCard` without `coverImg`');
	}

	return (
		<Styles.Wrapper hero={hero}>
			<TransparentLink ariaLabel={post.title} to={post.slug}>
				<Styles.Cover
					alt={post.coverImageAlt}
					image={getImage(post.coverImg)!}
				/>
			</TransparentLink>
			<Styles.Details hero={hero}>
				<Styles.Meta>
					<Styles.Header>
						<PostInfo post={post} />
						<TransparentLink to={post.slug}>
							{/* display as an H2 for accessibility and title semantics */}
							<H3 as="h2">{post.title}</H3>
						</TransparentLink>
					</Styles.Header>
					<TransparentLink ariaLabel={post.title} to={post.slug}>
						<Styles.Excerpt hero={hero}>{post.excerpt}</Styles.Excerpt>
					</TransparentLink>
				</Styles.Meta>
				{hero && <PostButton to={post.slug} />}
			</Styles.Details>
		</Styles.Wrapper>
	);
}
