import React from 'react';
import styled, { css } from 'styled-components';

import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

import { POST_WIDTH } from './PostSpacing';
import { typographyStyles } from '@/theme';
import { BaseImage, ImageShadow } from '@/components/Image';

interface IFigureProps {
	cover?: boolean;
}

interface IImageProps {
	src?: string;
	title?: string;
	alt: string;
}

interface ICoverImageProps {
	image: IGatsbyImageData;
	alt: string;
}

export const PostImageSpacing = css`
	/* adjust width and padding contingent on viewport size */
	@media (min-width: ${POST_WIDTH}) {
		max-width: ${POST_WIDTH};
		padding: 0 16px;

		/* Slightly round image corners */
		& > img {
			border-radius: 2px;
		}
	}
`;

const Figure = styled.figure<IFigureProps>`
	display: grid;
	width: 100%;
	grid-gap: 8px;
	justify-items: center;

	${({ cover }) => (!cover ? PostImageSpacing : '')}
`;

const Img = styled(BaseImage)`
	max-width: 100%;
`;

const StyledGatsbyImage = styled(GatsbyImage)`
	max-width: 100%;
	min-height: 300px;

	/* Limit cover image heights */
	max-height: 700px;

	& img {
		${ImageShadow}
	}
`;

export const FigCaptionCss = css`
	${typographyStyles.Caption}

	color: var(--color-grey-700, rgb(0, 0, 0));
`;

const FigCaption = styled.figcaption`
	${typographyStyles.Caption}

	color: var(--color-grey-700, rgb(0, 0, 0));
`;

export const PostImage = ({ src, alt, title }: IImageProps): JSX.Element => (
	<Figure>
		<Img src={src} alt={alt} />
		<FigCaption>{title || alt}</FigCaption>
	</Figure>
);

export const CoverImage = ({ image, alt }: ICoverImageProps): JSX.Element => (
	<Figure cover>
		<StyledGatsbyImage image={image} alt={alt} />
		<FigCaption>{alt}</FigCaption>
	</Figure>
);
