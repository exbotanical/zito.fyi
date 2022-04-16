import { render } from '@testing-library/react'
import React from 'react'

import { ThemeProvider } from '@/styles'

export function RenderStyled(children: JSX.Element) {
  return render(<ThemeProvider>{children}</ThemeProvider>)
}
