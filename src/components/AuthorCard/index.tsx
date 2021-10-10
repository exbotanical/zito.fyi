import React from 'react';

import * as S from './styles';
import { Body } from '@/theme';

import { useConfig } from '@/config';

export const AuthorCard = (): JSX.Element | null => {
	const { user } = useConfig();

	if (!user) return null;

	const fullName = `${user.firstName} ${user.surname}`;

	return (
		<S.Wrapper aria-label="About the author">
			<S.Main>
				<S.Avatar src={user.avatar} alt={fullName} />
				<S.Info>
					<S.AuthorName>{fullName}</S.AuthorName>
					<S.AboutText>
						<Body>{user.about}</Body>
					</S.AboutText>
				</S.Info>
			</S.Main>
		</S.Wrapper>
	);
};
