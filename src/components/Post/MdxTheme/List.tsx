import React from 'react';
import styled from 'styled-components';

import { ExtendingWrapper } from '@/components/Post/PostSpacing';
import { typographyStyles } from '@/theme';

interface IListProps {
	children?: React.ReactNode;
}

const UnorderedStyle = styled.ul`
	padding-left: 40px;
`;

export function UnorderedList({ children }: IListProps): JSX.Element {
	return (
		<ExtendingWrapper>
			<UnorderedStyle>{children}</UnorderedStyle>
		</ExtendingWrapper>
	);
}

const OrderedStyle = styled.ol`
	padding-left: 40px;
`;

export function OrderedList({ children }: IListProps): JSX.Element {
	return (
		<ExtendingWrapper>
			<OrderedStyle>{children}</OrderedStyle>
		</ExtendingWrapper>
	);
}

export const Item = styled.li`
	${typographyStyles.Body}
	& > ${ExtendingWrapper} {
		padding-left: 0;
	}

	& > * {
		margin-bottom: 12px;
	}

	::marker {
		color: var(--color-grey-500, rgb(191, 85, 105));
	}

	:hover {
		::marker {
			color: var(--color-primary-100, rgb(251, 248, 228));
		}
	}
`;
