import { format } from 'date-fns'
import React from 'react'

import type { Post } from '@/types'

import * as S from './styles'

interface PostInfoProps {
  readonly post: Post
}

const N_TAGS = 2

export function PostInfo({ post }: PostInfoProps): JSX.Element {
  const categoryUrl = post.category ? `/category/${post.category}` : undefined

  const publicationDate = `${categoryUrl ? '\u00A0⋅ ' : ''}${format(
    post.datePublished,
    'LLL d, y',
  )}`

  const timeToRead = ` ⋅ ${post.timeToRead}`

  const infoCaption = `${publicationDate}${timeToRead}`

  const tagLinks = post.tags?.slice(0, N_TAGS).map(tag => (
    <S.TagLink key={tag} to={`/tag/${tag}`}>
      {tag}
    </S.TagLink>
  ))

  return (
    <S.Wrapper>
      <S.InfoGrid>
        {categoryUrl ? (
          <S.CategoryLink to={categoryUrl}>{post.category}</S.CategoryLink>
        ) : null}
        <S.PostCaption>{infoCaption}</S.PostCaption>
      </S.InfoGrid>
      <S.TagGrid>{tagLinks}</S.TagGrid>
    </S.Wrapper>
  )
}
