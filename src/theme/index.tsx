import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { Color } from './Color';
import { ScrollbarStyles } from './Scrollbar';

import { Reset } from './Reset';
import { Typography } from './Typography';

interface IThemeProps {
	children: React.ReactNode;
	theme: 'light' | 'dark';
}

const lightTheme = {
	colorprimary: '#9A1D1D',
	colorprimary100: 'rgb(251, 248, 228)',
	colorprimary200: 'rgb(247, 240, 194)',
	colorprimary300: 'rgb(207, 121, 100)',
	colorprimary400: 'rgb(218, 59, 59)',
	colorprimary500: 'rgb(191, 85, 105)',
	colorprimary600: 'rgb(142, 96, 117)',
	colorprimary700: 'rgb(12, 105, 121)',
	colorprimary800: 'rgb(3, 83, 99)',
	colorprimary900: 'rgb(10, 49, 68)',
	colorgrey100: 'rgb(10, 49, 68)',
	colorgrey200: 'rgb(3, 83, 99)',
	colorgrey300: 'rgb(12, 105, 121)',
	colorgrey400: 'rgb(142, 96, 117)',
	colorgrey500: 'rgb(191, 85, 105)',
	colorgrey600: 'rgb(218, 59, 59)',
	colorgrey700: '',
	colorgrey800: 'rgb(247, 240, 194)',
	colorgrey900: 'rgb(251, 248, 228)',
	colorgrey1000: 'rgb(251, 248, 228)',
	colortext: '#000',
	colortextinverted: 'rgb(251, 248, 228)',
	colorbg: 'rgb(247, 240, 194)',
	colorbginverted: '#000'
};

const darkTheme = {
	colorprimary: 'rgb(84, 157, 225)',
	colorprimary100: 'rgb(206, 166, 186)',
	colorprimary200: 'rgb(184, 111, 170)',
	colorprimary300: 'rgb(183, 86, 184)',
	colorprimary400: 'rgb(128, 65, 200)',
	colorprimary500: 'rgb(62, 63, 163)',
	colorprimary600: 'rgb(38, 57, 125)',
	colorprimary700: 'rgb(32, 45, 98)',
	colorprimary800: 'rgb(47, 43, 69)',
	colorprimary900: 'rgb(25, 23, 37)',
	colorgrey100: 'rgb(47, 43, 69)',
	colorgrey200: 'rgb(38, 57, 125)',
	colorgrey300: 'rgb(184, 65, 190)',
	colorgrey400: 'rgb(184, 111, 170)',
	colorgrey500: 'rgb(120, 112, 170)',
	colorgrey600: 'rgb(184, 65, 190)',
	colorgrey700: 'rgb(184, 111, 170)',
	colorgrey800: 'rgb(38, 55, 122)',
	colorgrey900: 'rgb(22, 55, 128)',
	colorgrey1000: 'rgb(206, 166, 186)',
	colortext: 'rgb(206, 166, 186)',
	colortextinverted: '#fff',
	colorbg: 'rgb(25, 23, 37)',
	colorbginverted: 'rgb(204, 5, 190)'
};

export const ThemeProvider = ({
	children,
	theme
}: IThemeProps): JSX.Element => (
	<StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
		<Reset />
		<Color />
		<Typography />
		<ScrollbarStyles />
		{children}
	</StyledThemeProvider>
);

export * from './constants';
export * from './Primitives';
export * from './Typography';
