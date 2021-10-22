import { createGlobalStyle } from 'styled-components';

export const Reset = createGlobalStyle<{
	theme: { colorbg: string; colortext: string };
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
	min-width: 100%;
	min-height: 100%;
	padding: 0;
	margin: 0;
	background: var(--color-background);
	color: var(--color-text);
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
`;
