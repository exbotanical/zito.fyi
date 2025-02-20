import { createGlobalStyle } from 'styled-components'

import type { Theme } from './Theme'

export const Reset = createGlobalStyle<{
  theme: Theme
}>`
html {
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: inherit;
	padding: 0;
	margin: 0;
}

body {
	/* needed for absolute pos static noise div */
	position: relative;
	min-width: 100%;
	min-height: 100%;
	padding: 0;
	margin: 0;
	background: ${({ theme }) => theme.colors.bg.primary};
	color: ${({ theme }) => theme.colors.font.primary};
}

#___gatsby #gatsby-focus-wrapper {
	min-width: 100%;
	min-height: 100vh;
}

a,
a:visited,
a:hover,
a:active {
	color: inherit;
}

p {
	hyphens: auto;
	word-break: break-word;
}

.noise {
	position: absolute;
	z-index: 980;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	height: 100%;
	animation: fade-in 4s;
	background-size: calc(2px * 64);
	opacity: 0.012;
	pointer-events: none;
}

@keyframes fade-in {
	from {
		opacity: 0;
	}
}

img:not([src*=".svg"]) {
	${({ theme }) => (theme.dark ? 'filter: brightness(75%)' : '')};
}
`
