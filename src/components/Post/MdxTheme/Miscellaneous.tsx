import React from 'react';
import { css, createGlobalStyle } from 'styled-components';

import {
	PostImage,
	PostImageSpacing,
	FigCaptionCss
} from '@/components/Post/PostImage';
import { ExtendingWrapper } from '@/components/Post/PostSpacing';
import { BaseImage } from '@/components/Image';
import { AnimatedLink } from '@/components/Links';
import { Separator } from '@/components/Separator';

interface ILinkProps extends React.HTMLProps<HTMLAnchorElement> {
	activeClassName?: string;
	to: string;
}

export const Break = (): JSX.Element => (
	<ExtendingWrapper>
		<Separator />
	</ExtendingWrapper>
);

export const Link = ({
	children,
	className,
	activeClassName,
	to,
	href,
	target,
	rel,
	style
}: ILinkProps): JSX.Element => {
	// allow `gatsby-remark-images` to handle its own links
	if (className === 'gatsby-resp-image-link') {
		return (
			<a
				className={className}
				href={href}
				target={target}
				rel={rel}
				style={style}
			>
				{children}
			</a>
		);
	}

	return (
		<AnimatedLink
			className={className}
			activeClassName={activeClassName}
			to={to}
			href={href}
		>
			{children}
		</AnimatedLink>
	);
};

export const GlobalGatsbyImageStyle = createGlobalStyle`${css`
	.gatsby-resp-image-figure {
		width: 100%;

		${PostImageSpacing}
	}

	.gatsby-resp-image-figcaption {
		margin-top: 8px;
		text-align: center;

		${FigCaptionCss}
	}
`}
`;

export const MdxImage = ({
	src,
	alt,
	className,
	title,
	srcSet,
	sizes,
	loading,
	style
}: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element => {
	if (className === 'gatsby-resp-image-image') {
		return (
			<BaseImage
				src={src}
				alt={alt}
				title={title}
				srcSet={srcSet}
				sizes={sizes}
				loading={loading}
				style={style}
				className={className}
			/>
		);
	}

	if (!alt) {
		throw Error(
			`MDX image is missing an alt tag. Image source: ${src || ''}, title: ${
				title || ''
			}.`
		);
	}

	return <PostImage src={src} alt={alt} title={title} />;
};
