import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const renderWithQueryClient = (
  children: React.ReactNode,

  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult =>
  render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    options,
  )
