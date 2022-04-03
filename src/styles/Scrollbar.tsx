import { createGlobalStyle, css } from 'styled-components';

export const ScrollbarStyles = createGlobalStyle`${css`
	/* Firefox */
	* {
		scrollbar-color: ${({ theme }) => theme.colors.p4};
		${({ theme }) => theme.colors.p1};
	}

	/* WebKit based */
	*::-webkit-scrollbar {
		width: 12px;
		height: 12px;
	}

	*::-webkit-scrollbar-track {
		background: ${({ theme }) => theme.colors.p1};
	}

	*::-webkit-scrollbar-thumb {
		border: 2px solid ${({ theme }) => theme.colors.p1};
		background: ${({ theme }) => theme.colors.p4};
		border-radius: 6px;
	}

	*::-webkit-scrollbar-thumb:hover {
		background: ${({ theme }) => theme.colors.p2};
	}

	*::-webkit-scrollbar-thumb:active {
		background: ${({ theme }) => theme.colors.l1};
	}
`}
`;
