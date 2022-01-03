import React from 'react';

import type { ILinkProps } from '@/components/Links/types';

import * as S from '@/components/Links/styles';

export function IconLink({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element {
  return <S.IconLink
		activeClassName={activeClassName}
		ariaLabel={ariaLabel}
		className={className}
		href={href}
		noBasePath={noBasePath}
		to={to}
	>
		{children}
	</S.IconLink>
}

export function PrimaryLink({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element {
  return <S.PrimaryLink
		activeClassName={activeClassName}
		ariaLabel={ariaLabel}
		className={className}
		href={href}
		noBasePath={noBasePath}
		to={to}
	>
		{children}
	</S.PrimaryLink>
}

export function AnimatedLink({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element {
  return <S.AnimatedLink
		activeClassName={activeClassName}
		ariaLabel={ariaLabel}
		className={className}
		href={href}
		noBasePath={noBasePath}
		to={to}
	>
		{children}
	</S.AnimatedLink>
}

export function TransparentLink({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element {
  return <S.TransparentLink
		activeClassName={activeClassName}
		ariaLabel={ariaLabel}
		className={className}
		href={href}
		noBasePath={noBasePath}
		to={to}
	>
		{children}
	</S.TransparentLink>
}

export function HeadingLink({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element {
  return <S.HeadingLink
		activeClassName={activeClassName}
		ariaLabel={ariaLabel}
		className={className}
		href={href}
		noBasePath={noBasePath}
		to={to}
	>
		{children}
	</S.HeadingLink>
}
