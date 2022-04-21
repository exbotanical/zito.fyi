import React from 'react'

import { useConfig } from '@/config'
import { Caption } from '@/styles/Primitives'

import { AuthorCard } from '../AuthorCard'
import { Socials } from '../Socials'

import * as S from './styles'

export function Footer(): JSX.Element {
  const config = useConfig()

  return (
    <S.Wrapper>
      <AuthorCard />
      <S.LinkGrid>
        <Socials includeRss />
      </S.LinkGrid>
      <S.Info>
        <Caption>
          Licensed under{' '}
          <a target="_blank" href={config.site.copyright.link}>
            {config.site.copyright.name}
          </a>
        </Caption>
      </S.Info>
    </S.Wrapper>
  )
}
