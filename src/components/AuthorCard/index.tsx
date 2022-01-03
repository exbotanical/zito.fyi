import React from 'react';

import * as S from './styles';

import { useConfig } from '@/config';
import { Body } from '@/theme';


export function AuthorCard(): JSX.Element {
	const { user } = useConfig();

	const fullName = `${user.firstName} ${user.surname}`;

	return (
		<S.Wrapper aria-label="About the author">
			<S.Main>
				<S.Avatar alt={fullName} src={user.avatar} />
				<S.Info>
					<S.AuthorName>{fullName}</S.AuthorName>
					<S.AboutText>
						<Body>{user.about}</Body>
					</S.AboutText>
				</S.Info>
			</S.Main>
		</S.Wrapper>
	);
}
