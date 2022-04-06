import React from 'react';

import { useConfig } from '@/config';
import { Caption } from '@/styles/Primitives';

import { AuthorCard } from '../AuthorCard';
import { Socials } from '../Socials';

import * as S from './styles';

export function Footer(): JSX.Element {
	const config = useConfig();

	return (
		<S.Wrapper>
			<AuthorCard />
			<S.LinkGrid>
				<Socials includeRss />
			</S.LinkGrid>
			<S.Info>
				<Caption>{config.site.copyright}</Caption>
			</S.Info>
		</S.Wrapper>
	);
}
