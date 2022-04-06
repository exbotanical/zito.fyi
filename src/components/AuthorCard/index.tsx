import React from 'react';

import { useConfig } from '@/config';
import { Body } from '@/styles';

import * as S from './styles';

// import { useStaticQuery, graphql } from 'gatsby';
// import type { ImageDataLike } from 'gatsby-plugin-image';
// import { avatarQuery } from 'node';

// interface AvatarQueryResult {
// 	fileName?: ImageDataLike;
// }

export function AuthorCard(): JSX.Element {
	const { user } = useConfig();
	// const { fileName } = useStaticQuery<AvatarQueryResult>(avatarQuery);
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
