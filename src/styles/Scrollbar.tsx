import { createGlobalStyle, css } from 'styled-components';

export const ScrollbarStyles = createGlobalStyle`${css`
	/* Firefox */
	* {
		scrollbar-color: ${({ theme }) => theme.colors.font.primary};
	}

	*::-webkit-scrollbar {
		width: 14px;
	}

	*::-webkit-scrollbar-track {
		background: ${({ theme }) => theme.colors.scroll.bg};
	}

	*::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.colors.scroll.fg};
		border-radius: 3px;
	}
`}
`;
