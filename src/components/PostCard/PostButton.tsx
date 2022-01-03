import { Exit } from '@styled-icons/boxicons-regular';
import { Link as GatsbyLink } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { typographyStyles } from '@/theme';
import { BREAKPOINTS } from '@/theme/constants';

interface IPostButtonProps {
	to: string;
}

export const ReadButton = styled(GatsbyLink)`
	display: grid;
	align-items: center;
	align-self: flex-end;
	justify-content: start;
	color: var(--color-primary, #9a1d1d);
	grid-auto-flow: column;
	grid-gap: 12px;
	text-decoration: none;
	${typographyStyles.ButtonLabel}
	@media (max-width: ${BREAKPOINTS.lg}) {
		display: none;
	}
`;

export function PostButton({ to }: IPostButtonProps): JSX.Element {
  return <ReadButton to={to}>
		Read the post <Exit size={28} />
	</ReadButton>
}
