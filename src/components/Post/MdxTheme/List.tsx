import React from 'react';
import styled from 'styled-components';

import { ExtendingWrapper } from '@/components/Post/PostSpacing';
import { typographyStyles } from '@/styles';

interface ListProps {
	children?: React.ReactNode;
}

const UnorderedStyle = styled.ul`
	padding-left: 40px;
`;

export function UnorderedList({ children }: ListProps): JSX.Element {
	return (
		<ExtendingWrapper>
			<UnorderedStyle>{children}</UnorderedStyle>
		</ExtendingWrapper>
	);
}

const OrderedStyle = styled.ol`
	padding-left: 40px;
`;

export function OrderedList({ children }: ListProps): JSX.Element {
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
		color: ${({ theme }) => theme.colors.font.primary};
	}

	:hover {
		::marker {
			color: ${({ theme }) => theme.colors.font.primary};
		}
	}
`;
