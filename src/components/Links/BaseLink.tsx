import { Link as GatsbyLink } from 'gatsby';
import React from 'react';

import { withBasePath } from '../../../node';

import type { LinkProps } from '@/components/Links/types';

import { useConfig } from '@/config';

export function BaseLink({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: LinkProps): JSX.Element {
	const config = useConfig();

	const url = href || to;

	const isInternalUrl = /^\/(?!\/)/.test(url);

	// if it's an internal URL, we'll need to prepend it with the base path
	const internalUrl = !noBasePath ? withBasePath(config, url) : url;

	return isInternalUrl ? (
		<GatsbyLink
			activeClassName={activeClassName}
			aria-label={ariaLabel}
			className={className}
			to={internalUrl}
		>
			{children}
		</GatsbyLink>
	) : (
		<a
			aria-label={ariaLabel}
			className={className}
			href={url}
			rel="noreferrer"
			target="_blank"
		>
			{children}
		</a>
	);
}
