import React from 'react'
import { styled } from 'styled-components'

import { ExtensionWrapper } from '@/components/Post/PostSpacing'
import { typographyStyles } from '@/styles'

interface ListProps {
  readonly children?: React.ReactNode
}

const UnorderedStyle = styled.ul`
  padding-left: 40px;
`

export function UnorderedList({ children }: ListProps): React.JSX.Element {
  return (
    <ExtensionWrapper>
      <UnorderedStyle>{children}</UnorderedStyle>
    </ExtensionWrapper>
  )
}

const OrderedStyle = styled.ol`
  padding-left: 40px;
`

export function OrderedList({ children }: ListProps): React.JSX.Element {
  return (
    <ExtensionWrapper>
      <OrderedStyle>{children}</OrderedStyle>
    </ExtensionWrapper>
  )
}

export const Item = styled.li`
  ${typographyStyles.Body}
  & > ${ExtensionWrapper} {
    padding-left: 0;
  }

  & > * {
    margin-bottom: 12px;
  }

  ::marker {
    color: ${({ theme }) => theme.colors.font.primary};
  }

  :hover {
    ::marker {
      color: ${({ theme }) => theme.colors.font.primary};
    }
  }
`
