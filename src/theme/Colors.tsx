import { createGlobalStyle, css } from 'styled-components';

const Colors = css`
	.theme-light {
		--color-primary: #9a1d1d;
		--color-primary-100: rgb(251, 248, 228);
		--color-primary-200: rgb(247, 240, 194);
		--color-primary-300: rgb(207, 12, 0);
		--color-primary-400: rgb(218, 59, 59);
		--color-primary-500: rgb(191, 85, 105);
		--color-primary-600: rgb(142, 96, 117);
		--color-primary-700: rgb(12, 105, 121);
		--color-primary-800: rgb(3, 83, 99);
		--color-primary-900: rgb(10, 49, 68);
		--color-grey-100: rgb(10, 49, 68);
		--color-grey-200: rgb(3, 83, 99);
		--color-grey-300: rgb(102, 95, 101);
		--color-grey-400: rgb(142, 96, 117);
		--color-grey-500: rgb(191, 85, 105);
		--color-grey-600: rgb(218, 59, 59);
		--color-grey-700: rgb(0, 0, 0);
		--color-grey-800: rgb(247, 240, 194);
		--color-grey-900: rgb(251, 248, 228);
		--color-grey-1000: rgb(251, 248, 228);
		--color-grey-2000: rgb(255, 181, 120);
		--color-text: rgb(0, 0, 0);
		--color-inverted-text: rgb(251, 248, 228);
		--color-background: rgb(247, 240, 194);
		--color-inverted-background: rgb(0, 0, 0);
		--color-accent: #fb923c; // @TODO
	}

	.theme-dark {
		--color-primary: rgb(104, 157, 225);
		--color-primary-100: rgb(206, 166, 186);
		--color-primary-200: rgb(184, 111, 170);
		--color-primary-300: rgb(182, 116, 182);
		--color-primary-400: rgb(128, 65, 200);
		--color-primary-500: rgb(62, 63, 163);
		--color-primary-600: rgb(38, 57, 125);
		--color-primary-700: rgb(32, 45, 98);
		--color-primary-800: rgb(47, 43, 69);
		--color-primary-900: rgb(25, 23, 37);
		--color-grey-100: rgb(47, 43, 69);
		--color-grey-200: rgb(38, 57, 125);
		--color-grey-300: rgb(100, 102, 140);
		--color-grey-400: rgb(184, 111, 170);
		--color-grey-500: rgb(120, 112, 170);
		--color-grey-600: rgb(184, 65, 190);
		--color-grey-700: rgb(184, 111, 170);
		--color-grey-800: rgb(38, 55, 122);
		--color-grey-900: rgb(22, 55, 128);
		--color-grey-1000: rgb(206, 166, 186);
		--color-grey-2000: rgb(47, 43, 69);
		--color-text: rgb(206, 166, 186);
		--color-inverted-text: #fff;
		--color-background: rgb(25, 23, 37);
		--color-inverted-background: rgb(204, 5, 190);
		--color-accent: #3730a3; // @TODO
	}
`;

export const Color = createGlobalStyle`
		${Colors}
`;
