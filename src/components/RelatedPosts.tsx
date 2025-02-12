import React from 'react'
import styled from 'styled-components'

import { Feed } from '@/components/Feed'
import type { Post } from '@/types'

interface RelatedPostsProps {
  readonly posts: Post[]
}

const Wrapper = styled.aside`
  display: grid;
  grid-gap: 40px;
  justify-items: center;
`

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return posts.length ? (
    <Wrapper data-testid="related-posts">
      <Feed feedItems={posts} hideHero />
    </Wrapper>
  ) : null
}
