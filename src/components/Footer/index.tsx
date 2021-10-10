import React from 'react';

import { AuthorCard } from '../AuthorCard';
import { Socials } from '../Socials';
import * as S from './styles';
import { useConfig } from '@/config';

import { Caption } from '@/theme/Primitives';

export const Footer = (): JSX.Element => {
	const config = useConfig();

	return (
		<S.Wrapper>
			<S.LinkGrid>
				<AuthorCard />
				<Socials includeRss />
			</S.LinkGrid>
			<S.Info>
				<Caption>{config.site.copyright}</Caption>
			</S.Info>
		</S.Wrapper>
	);
};
