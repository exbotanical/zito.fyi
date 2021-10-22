import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';
import { Exit } from '@styled-icons/boxicons-regular';

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
	color: var(--color-primary);
	grid-auto-flow: column;
	grid-gap: 12px;
	text-decoration: none;
	${typographyStyles.ButtonLabel}
	@media (max-width: ${BREAKPOINTS.lg}) {
		display: none;
	}
`;

export const PostButton = ({ to }: IPostButtonProps): JSX.Element => (
	<ReadButton to={to}>
		Read the post <Exit size={28} />
	</ReadButton>
);
