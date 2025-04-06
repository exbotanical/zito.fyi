import { render } from '@testing-library/react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import type { RenderOptions, RenderResult } from '@testing-library/react'

const queryClient = new QueryClient()

export function renderWithQueryClient(
  children: React.ReactNode,

  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    options,
  )
}
