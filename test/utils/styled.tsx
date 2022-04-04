import React from 'react';
import { ThemeProvider } from '@/styles';
import { render } from '@testing-library/react';

export function RenderStyled(children: JSX.Element) {
	return render(<ThemeProvider>{children}</ThemeProvider>);
}
