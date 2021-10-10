import styled, { css } from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Body, breakpoints } from '@/theme';

import { ImageShadow } from '@/components/Image';

interface ICardStyleProps {
	hero?: boolean;
}

export const Cover = styled(GatsbyImage)`
	width: 100%;
	height: 368px;

	/* Tune the height on smaller screen resolutions */
	@media (max-width: 500px) {
		height: 320px;
	}

	@media (max-width: 440px) {
		height: 270px;
	}

	& img {
		${ImageShadow}

		border-radius: 10px;
	}
`;

export const Wrapper = styled.div<ICardStyleProps>`
	display: grid;
	grid-gap: 8px;

	${({ hero }) =>
		hero &&
		css`
			@media (min-width: ${breakpoints.lg}) {
				grid-column: span 2;
				grid-gap: 32px;
				grid-template-columns: 6fr 4fr;
			}
		`}
`;

export const Header = styled.div`
	display: grid;
	align-content: start;
	align-items: flex-start;
	grid-gap: 12px;
`;

export const Excerpt = styled(Body)<ICardStyleProps>`
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${({ hero }) => (hero ? 5 : 2)};
`;

export const Meta = styled.div`
	display: grid;
	align-content: start;
	align-items: flex-start;
	grid-gap: 12px;
`;

export const Details = styled.div<ICardStyleProps>`
	display: grid;

	${({ hero }) =>
		hero &&
		css`
			@media (min-width: var(--breakpoint-lg)) {
				align-content: space-between;
			}
		`}
`;
