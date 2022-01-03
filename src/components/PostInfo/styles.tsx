import styled from 'styled-components';

import { PrimaryLink } from '@/components/Links';
import { typographyStyles, Caption } from '@/theme';

export const TagLink = styled(PrimaryLink)`
	${typographyStyles.Overline}

	text-transform: uppercase;

	&::before {
		content: '#';
	}
`;

export const CategoryLink = styled(PrimaryLink)`
	${typographyStyles.Caption}

	text-transform: capitalize;
`;

export const PostCaption = styled(Caption)`
	color: var(--color-primary-300, rgb(207, 12, 0));
`;

export const InfoGrid = styled.div`
	display: flex;
	flex-direction: row;
`;

export const TagGrid = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-gap: 16px;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
`;
