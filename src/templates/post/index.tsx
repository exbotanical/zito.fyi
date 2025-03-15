import React from 'react'
import { styled } from 'styled-components'

import { Layout } from '@/components/Layout'
import { Post } from '@/components/Post'
import { RelatedPosts } from '@/components/RelatedPosts'
import type { PostBySlugQueryResult, PostJson } from '@/types'
import { jsonToPost, queryToPost } from '@/utils'

interface PageContext {
  relatedPosts: PostJson[]
}

interface PostTemplateProps {
  readonly data: PostBySlugQueryResult
  readonly pageContext: PageContext
  readonly children?: React.ReactNode
}

const Wrapper = styled.div`
  display: grid;
  grid-gap: 60px;
`

export function PostTemplate({
  data,
  pageContext,
  children,
}: PostTemplateProps): React.JSX.Element {
  const post = queryToPost(data)

  return (
    <Layout post={post}>
      <Wrapper>
        <Post post={post}>{children}</Post>
        <RelatedPosts posts={pageContext.relatedPosts.map(jsonToPost)} />
      </Wrapper>
    </Layout>
  )
}
