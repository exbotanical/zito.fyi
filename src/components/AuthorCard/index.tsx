import React from 'react'

import { useConfig } from '@/config'
import { Body } from '@/styles'

import * as S from './styles'

export function AuthorCard(): React.JSX.Element {
  const { user } = useConfig()
  const fullName = `${user.firstName} ${user.surname}`

  return (
    <S.Wrapper aria-label="About the author">
      <S.Content>
        <S.Avatar alt={fullName} src={user.avatar} />
        <S.Info>
          <S.AuthorName>{fullName}</S.AuthorName>
          <S.AboutText>
            <Body>{user.about}</Body>
          </S.AboutText>
        </S.Info>
      </S.Content>
    </S.Wrapper>
  )
}
