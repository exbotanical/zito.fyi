import React from 'react';
import styled from 'styled-components';

import { typographyStyles } from '@/theme';

import { ExtendingWrapper } from '@/components/Post/PostSpacing';

interface IListProps {
	children?: React.ReactNode;
}

const UnorderedStyle = styled.ul`
	padding-left: 40px;
`;

export const UnorderedList = ({ children }: IListProps): JSX.Element => (
	<ExtendingWrapper>
		<UnorderedStyle>{children}</UnorderedStyle>
	</ExtendingWrapper>
);

const OrderedStyle = styled.ol`
	padding-left: 40px;
`;

export const OrderedList = ({ children }: IListProps): JSX.Element => (
	<ExtendingWrapper>
		<OrderedStyle>{children}</OrderedStyle>
	</ExtendingWrapper>
);

export const Item = styled.li`
	${typographyStyles.Body}
	& > ${ExtendingWrapper} {
		padding-left: 0;
	}

	& > * {
		margin-bottom: 12px;
	}

	::marker {
		color: var(--color-grey-500);
	}

	:hover {
		::marker {
			color: var(--color-primary-100);
		}
	}
`;
