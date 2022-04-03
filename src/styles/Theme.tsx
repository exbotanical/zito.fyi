import { Reset } from './Reset';
import { ScrollbarStyles } from './Scrollbar';
import { Typography } from './Typography';
import React, { createContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useLocalStorage } from '@/hooks';

type Themes = 'dark' | 'light';
interface ThemeContext {
	theme: Themes;
	toggleTheme: () => void;
}

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: typeof lightTheme.colors;
	}
}

interface ThemeProps {
	children: React.ReactNode;
}

export const lightTheme = {
	colors: {
		p1: 'rgb(251, 248, 228)',
		p2: 'rgb(247, 240, 194)',
		p3: 'rgb(218, 59, 59)',
		p4: 'rgb(191, 85, 105)',
		p5: 'rgb(142, 96, 117)',
		p6: 'rgb(10, 49, 68)',
		g1: 'rgb(102, 95, 101)',
		g2: 'rgb(255, 181, 120)',
		b1: 'rgb(0, 0, 0)',
		b2: 'rgb(10, 49, 68)',
		b3: 'rgb(251, 248, 228)',
		l1: 'rgb(207, 12, 0)',
		f1: 'rgb(251, 248, 228)'
	}
};

export const darkTheme = {
	colors: {
		p1: ' rgb(25, 23, 37)',
		p2: 'rgb(184, 111, 170)',
		p3: 'rgb(171, 137, 194)',
		p4: 'rgb(206, 166, 186)',
		p5: 'rgb(184, 111, 170)',
		p6: 'rgb(38, 57, 125)',
		g1: 'rgb(100, 102, 140)',
		g2: 'rgb(47, 43, 69)',
		b1: 'rgb(206, 166, 186)',
		b2: 'rgb(47, 43, 69)',
		b3: 'rgb(206, 166, 186)',
		l1: 'rgb(104, 157, 225)',
		f1: '#fff'
	}
};

export const ThemeToggleContext = createContext({} as ThemeContext);

export function ThemeProvider({ children }: ThemeProps): JSX.Element {
	const prefersDark =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches;

	const [theme, setTheme] = useLocalStorage<Themes>(
		'theme',
		prefersDark ? 'dark' : 'light'
	);

	function toggleTheme() {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}

	return (
		<ThemeToggleContext.Provider value={{ theme, toggleTheme }}>
			<StyledThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
				<Reset />
				<Typography />
				<ScrollbarStyles />
				{children}
			</StyledThemeProvider>
		</ThemeToggleContext.Provider>
	);
}
