import React from 'react';
import styled from 'styled-components';

import { MailSend, Rss } from '@styled-icons/boxicons-regular';
import { Twitter, LinkedinSquare, Github } from '@styled-icons/boxicons-logos';
import { StyledIcon } from '@styled-icons/styled-icon';

import { IconLink } from '../Links';
import { ISiteConfig } from '../../types';
import { useConfig } from '../../config';

const generateLink = (
	url: string,
	label: string,
	Icon: StyledIcon
): JSX.Element => (
	<IconLink to={url} ariaLabel={label}>
		<Icon size={48} />
	</IconLink>
);

const renderTwitterLink = (
	config: Readonly<ISiteConfig>
): JSX.Element | null => {
	const username = config.user.twitterHandle;

	if (!username) return null;

	const url = `https://twitter.com/${username}`;
	return generateLink(url, 'Twitter Profile', Twitter);
};

const renderGitHubLink = (
	config: Readonly<ISiteConfig>
): JSX.Element | null => {
	const username = config.user.github;

	if (!username) return null;

	const url = `https://github.com/${username}`;
	return generateLink(url, 'GitHub Profile', Github);
};

const generateLinkedInLink = (
	config: Readonly<ISiteConfig>
): JSX.Element | null => {
	const username = config.user.linkedIn;

	if (!username) return null;

	const url = `https://www.linkedin.com/in/${username}`;
	return generateLink(url, 'LinkedIn Profile', LinkedinSquare);
};

const renderEmailLink = (config: Readonly<ISiteConfig>): JSX.Element => {
	const url = `mailto:${config.user.email || ''}`;
	return generateLink(url, 'E-Mail', MailSend);
};

const renderRssLink = (config: Readonly<ISiteConfig>): JSX.Element =>
	generateLink(config.site.rss, 'RSS Feed', Rss);

interface IIconLinksProps {
	includeRss?: boolean;
	className?: string;
}

const defaultProps: IIconLinksProps = {
	includeRss: false
};

const LinkGrid = styled.div`
	display: grid;
	gap: 24px;
	grid-auto-flow: column;
`;

export const Socials = ({
	includeRss,
	className
}: IIconLinksProps): JSX.Element | null => {
	const config = useConfig();

	return (
		<LinkGrid className={className}>
			{renderTwitterLink(config)}
			{renderGitHubLink(config)}
			{generateLinkedInLink(config)}
			{renderEmailLink(config)}
			{includeRss && renderRssLink(config)}
		</LinkGrid>
	);
};

Socials.defaultProps = defaultProps;
