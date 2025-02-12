/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import styled from 'styled-components'

import { Footer } from '@/components/Footer'
import { LayoutWidthContainer } from '@/components/LayoutWidthContainer'
import { Navigation } from '@/components/Navigation'
import { SEO } from '@/components/SEO'
import { ThemeProvider, BREAKPOINTS } from '@/styles'
import type { Post } from '@/types'

interface LayoutProps {
  readonly children?: React.ReactNode
  readonly post?: Post
}

const LayoutGrid = styled.div`
  display: grid;
  min-width: 100%;
  min-height: 100vh;
  align-content: space-between;
  padding-top: 16px;
  gap: 80px;
  grid-template-columns: 100%;

  @media (max-width: ${BREAKPOINTS.sm}) {
    gap: 40px;
  }
`

export function Layout({ children, post }: LayoutProps): JSX.Element {
  return (
    <ThemeProvider>
      <SEO post={post} />
      <LayoutGrid>
        <LayoutWidthContainer>
          <Navigation />
        </LayoutWidthContainer>
        {children}
        <Footer />
      </LayoutGrid>
    </ThemeProvider>
  )
}
