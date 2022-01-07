import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { Color } from './Colors';
import { Reset } from './Reset';
import { ScrollbarStyles } from './Scrollbar';
import { Typography } from './Typography';

interface ThemeProps {
	children: React.ReactNode;
}

// we'll pass on setting the theme here, for now. our current approach is to inject a small script
// that evaluates `prefers-color-scheme` and sets the theme
// doing this allows us to mitigate any sort of 'flash' on load
const theme = {};

export function ThemeProvider({ children }: ThemeProps): JSX.Element {
	return (
		<StyledThemeProvider theme={theme}>
			<Reset />
			<Color />
			<Typography />
			<ScrollbarStyles />
			{children}
		</StyledThemeProvider>
	);
}

export * from './constants';
export * from './Primitives';
export * from './Typography';
export * from './useTheme';
