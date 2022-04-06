import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import { BaseImage, ImageShadow } from '@/components/Image';
import { typographyStyles } from '@/styles';

import { POST_WIDTH } from './PostSpacing';

import type { IGatsbyImageData } from 'gatsby-plugin-image';

interface FigureProps {
	cover?: boolean;
}

interface ImageProps {
	src?: string;
	title?: string;
	alt: string;
}

interface CoverImageProps {
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

const Figure = styled.figure<FigureProps>`
	display: grid;
	width: 100%;
	grid-gap: 8px;
	justify-items: center;
	${({ cover }) => (!cover ? PostImageSpacing : '')};
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
`;

const FigCaption = styled.figcaption`
	${typographyStyles.Caption}
`;

export function PostImage({ src, alt, title }: ImageProps): JSX.Element {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		// @see https://stackoverflow.com/questions/2326499/apply-css-styles-to-an-element-depending-on-its-child-elements
		if (ref.current?.parentElement?.style) {
			// center image links
			ref.current.parentElement.style.display = 'table';
		}
	}, []);

	return (
		<Figure ref={ref}>
			<Img alt={alt} src={src} />
			<FigCaption>{title || alt}</FigCaption>
		</Figure>
	);
}

export function CoverImage({ image, alt }: CoverImageProps): JSX.Element {
	return (
		<Figure cover>
			<StyledGatsbyImage alt={alt} image={image} />
			<FigCaption>{alt}</FigCaption>
		</Figure>
	);
}
