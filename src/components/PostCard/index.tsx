import { getImage } from 'gatsby-plugin-image'
import React from 'react'

import { TransparentLink } from '@/components/Links'
import { PostInfo } from '@/components/PostInfo'
import { H3 } from '@/styles/Primitives'
import type { Post } from '@/types'

import { PostButton } from './PostButton'
import { PostCardSkeleton } from './Skeleton'
import * as Styles from './styles'

interface PostCardProps {
  post?: Post
  hero?: boolean
}

export function PostCard({ post, hero }: PostCardProps): JSX.Element {
  if (!post) {
    return <PostCardSkeleton />
  }

  if (!post.coverImg) {
    // TODO placeholder
    throw Error('Cannot render `PostCard` without `coverImg`')
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
              {/* display as an H2 in the interest of accessibility and semantic markup */}
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
  )
}
