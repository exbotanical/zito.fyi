import { createGlobalStyle, css } from 'styled-components';

export const ScrollbarStyles = createGlobalStyle`${css`
	/* Firefox */
	* {
		scrollbar-color:
			var(--color-grey-500, rgb(191, 85, 105))
			var(--color-background, rgb(247, 240, 194));
	}

	/* WebKit based */
	*::-webkit-scrollbar {
		width: 12px;
		height: 12px;
	}

	*::-webkit-scrollbar-track {
		background: var(--color-background, rgb(247, 240, 194));
	}

	*::-webkit-scrollbar-thumb {
		border: 2px solid var(--color-background, rgb(247, 240, 194));
		background: var(--color-grey-500, rgb(191, 85, 105));
		border-radius: 6px;
	}

	*::-webkit-scrollbar-thumb:hover {
		background: var(--color-primary-100, rgb(251, 248, 228));
	}

	*::-webkit-scrollbar-thumb:active {
		background: var(--color-primary, #9a1d1d);
	}
`}
`;
