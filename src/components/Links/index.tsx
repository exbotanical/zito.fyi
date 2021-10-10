import React from 'react';

import * as S from '@/components/Links/styles';
import type { ILinkProps } from '@/components/Links/types';

export const IconLink = ({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element => (
	<S.IconLink
		to={to}
		href={href}
		className={className}
		activeClassName={activeClassName}
		noBasePath={noBasePath}
		ariaLabel={ariaLabel}
	>
		{children}
	</S.IconLink>
);

export const PrimaryLink = ({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element => (
	<S.PrimaryLink
		to={to}
		href={href}
		className={className}
		activeClassName={activeClassName}
		noBasePath={noBasePath}
		ariaLabel={ariaLabel}
	>
		{children}
	</S.PrimaryLink>
);

export const AnimatedLink = ({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element => (
	<S.AnimatedLink
		to={to}
		href={href}
		className={className}
		activeClassName={activeClassName}
		noBasePath={noBasePath}
		ariaLabel={ariaLabel}
	>
		{children}
	</S.AnimatedLink>
);

export const TransparentLink = ({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element => (
	<S.TransparentLink
		to={to}
		href={href}
		className={className}
		activeClassName={activeClassName}
		noBasePath={noBasePath}
		ariaLabel={ariaLabel}
	>
		{children}
	</S.TransparentLink>
);

export const HeadingLink = ({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element => (
	<S.HeadingLink
		to={to}
		href={href}
		className={className}
		activeClassName={activeClassName}
		noBasePath={noBasePath}
		ariaLabel={ariaLabel}
	>
		{children}
	</S.HeadingLink>
);
