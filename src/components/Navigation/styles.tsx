import styled from 'styled-components';

import { typographyStyles } from '@/theme';
import { PrimaryLink, AnimatedLink } from '@/components/Links';

export const HomeButton = styled(PrimaryLink)`
	display: grid;
	align-items: center;
	color: var(--color-text, rgb(0, 0, 0));
	grid-auto-flow: column;
	grid-gap: 16px;
	text-decoration: none;
`;

export const Wrapper = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const NavGrid = styled.nav`
	display: grid;
	align-items: flex-start;
	grid-auto-flow: column;
	grid-gap: 24px;
`;

export const SiteTitle = styled.p`
	${typographyStyles.ButtonLabel}
	@media (max-width: 500px) {
		display: none;
	}
`;

export const NavButton = styled(AnimatedLink)`
	${typographyStyles.ButtonLabel}

	color: var(--color-text, rgb(0, 0, 0));

	&::after {
		margin: 8px 0 0 0;
	}
`;

export const ThemeButton = styled.div`
	cursor: pointer;
`;
