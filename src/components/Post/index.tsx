import React from 'react'
import { styled } from 'styled-components'

import type { Post as PostType } from '@/types'

import { PostIntro } from './PostIntro'
import { MdxRenderer } from './MdxRenderer'
import { PostShare } from './Share'

interface PostProps {
  readonly post: PostType
  readonly children?: React.ReactNode
}

const Wrapper = styled.main`
  display: grid;
  width: 100%;
  grid-gap: 24px;
  justify-items: center;
`

export function Post({ post, children }: PostProps): React.JSX.Element {
  return (
    <Wrapper>
      <PostIntro post={post} />
      <MdxRenderer post={post}>{children}</MdxRenderer>
      <PostShare post={post} />
    </Wrapper>
  )
}
