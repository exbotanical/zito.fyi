import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import { withBasePath } from '../../../config/utils';
import { useConfig } from '@/config';

import type { ILinkProps } from '@/components/Links/types';

export const BaseLink = ({
	to,
	href,
	className,
	children,
	activeClassName,
	noBasePath,
	ariaLabel
}: ILinkProps): JSX.Element => {
	const config = useConfig();

	const url = href || to;

	const isInternalUrl = /^\/(?!\/)/.test(url);

	// if it's an internal URL, we'll need to prepend it with the base path
	const internalUrl = !noBasePath ? withBasePath(config, url) : url;

	return isInternalUrl ?
		(
			<GatsbyLink
				activeClassName={activeClassName}
				className={className}
				to={internalUrl}
				aria-label={ariaLabel}
			>
				{children}
			</GatsbyLink>
		) :
		(
			<a className={className} href={url} aria-label={ariaLabel} rel="noreferrer">
				{children}
			</a>
		);
};
