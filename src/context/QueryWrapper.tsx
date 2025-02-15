import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

/**
 * Wrapper for `react-query` context, for both for SSR and Browser envs
 */
export function QueryWrapper({
  element,
}: {
  readonly element: React.ReactNode
}): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {element}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
