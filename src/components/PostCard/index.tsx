import React from 'react';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';

import { PostCardSkeleton } from './Skeleton';
import { PostButton } from './PostButton';
import * as Styles from './styles';
import { H3 } from '@/theme/Primitives';

import { TransparentLink } from '@/components/Links';
import { PostInfo } from '@/components/PostInfo';

import type { IPost } from '@/types';

interface IPostCardProps {
	post?: IPost;
	hero?: boolean;
}

export const PostCard = ({ post, hero }: IPostCardProps): JSX.Element => {
	if (!post) return <PostCardSkeleton />;

	if (!post.coverImg) {
		// TODO placeholder
		throw Error('Cannot render `PostCard` without `coverImg`');
	}

	return (
		<Styles.Wrapper hero={hero}>
			<TransparentLink to={post.slug} ariaLabel={post.title}>
				<Styles.Cover
					image={getImage(post.coverImg) as IGatsbyImageData}
					alt={post.coverImageAlt}
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
					<TransparentLink to={post.slug} ariaLabel={post.title}>
						<Styles.Excerpt hero={hero}>{post.excerpt}</Styles.Excerpt>
					</TransparentLink>
				</Styles.Meta>
				{hero && <PostButton to={post.slug} />}
			</Styles.Details>
		</Styles.Wrapper>
	);
};
