import styled from 'styled-components'

import { Separator } from '@/components/Separator'
import { Socials } from '@/components/Socials'
import { BREAKPOINTS, H3 } from '@/styles'

export const Wrapper = styled.section`
  display: grid;
  padding: 0 16px;
  justify-items: center;
  justify-self: center;
`

export const Content = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 32px;
  justify-items: center;

  @media (max-width: ${BREAKPOINTS.sm}) {
    grid-auto-flow: row;
  }
`

export const Info = styled.div`
  display: grid;
  align-content: flex-start;
  justify-content: flex-start;
  grid-gap: 16px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    justify-content: center;
    grid-auto-flow: row;
  }
`

export const Contact = styled.div`
  display: grid;
  align-content: center;
  align-items: center;
  margin-top: 8px;
  grid-auto-flow: column;
  grid-gap: 24px;

  @media (max-width: ${BREAKPOINTS.sm}) {
    justify-content: center;
    margin-top: 32px;
    grid-auto-flow: row;
    grid-gap: 8px;
    justify-items: center;
  }
`

export const Avatar = styled.img`
  overflow: hidden;
  width: 128px;
  height: 128px;
  border-radius: 50%;
`

export const ShareLabel = styled(H3)`
  line-height: 100%;
`

export const AuthorName = styled(H3)`
  color: ${({ theme }) => theme.colors.font.secondary};

  @media (max-width: ${BREAKPOINTS.sm}) {
    text-align: center;
  }
`

export const AboutText = styled.div`
  width: 0;
  min-width: 100%;
  align-self: center;

  & > p {
    color: ${({ theme }) => theme.colors.font.secondary};
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    width: 100%;
    & > p {
      text-align: justify;
    }
  }

  @media (min-width: ${BREAKPOINTS.lg}) {
    width: 500px;
  }
`

export const CompactSocials = styled(Socials)`
  grid-gap: 12px;
`

export const AuthorSeparator = styled(Separator)`
  margin-top: 8px;
`
