import styled from 'styled-components';

import { Link } from '@styled-icons/boxicons-regular';

import { H3 } from '@/theme';
import { IconCSS } from '@/components/Links/styles';

export const Wrapper = styled.section`
	display: grid;
	grid-auto-flow: row;
	grid-gap: 8px;
`;

export const LinkWrapper = styled.div`
	display: grid;
	align-content: center;
	align-items: center;
	grid-auto-flow: column;
	grid-gap: 24px;

	@media (max-width: 404px) {
		justify-content: center;
		grid-auto-flow: row;
		grid-gap: 8px;
		justify-items: center;
	}
`;

export const Label = styled(H3)`
	color: var(--color-grey-600, rgb(218, 59, 59));
	text-transform: uppercase;
`;

export const LinkGrid = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-gap: 12px;

	& svg {
		${IconCSS}
	}
`;

export const LinkButton = styled(Link)`
	cursor: pointer;
`;
