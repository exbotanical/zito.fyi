import React from 'react';
import styled, { css } from 'styled-components';

import { typographyStyles } from '@/theme';

import { WidthWrapper } from '@/components/Post/PostSpacing';

interface ITableProps {
	children?: React.ReactNode;
}

interface ICellProps {
	align?: string;
}

const TableWrapper = styled(WidthWrapper)`
	/* add scroll to tables when space is scarce */
	overflow-x: auto;
`;

const TableStyled = styled.table`
	margin: 0 auto;
	border-spacing: 2px;
	table-layout: fixed;
`;

const SharedCellCSS = css<ICellProps>`
	padding-top: 8px;
	padding-right: 16px;
	padding-bottom: 4px;
	padding-left: 16px;
	text-align: ${({ align }) => align};
`;

export const HeadCell = styled.th<ICellProps>`
	${SharedCellCSS}

	border-bottom: 2px solid var(--color-text);
	margin-right: 4px;
	margin-left: 4px;
`;

export const BodyCell = styled.td<ICellProps>`
	${SharedCellCSS}

	padding-top: 8px;
	padding-right: 16px;
	padding-bottom: 4px;
	padding-left: 16px;
	border-bottom: 1px solid var(--color-grey-300);

	:hover {
		background-color: var(--color-grey-100);
	}
`;

export const Body = styled.tbody`
	${typographyStyles.Body}
`;

export const Table = ({ children }: ITableProps): JSX.Element => (
	<TableWrapper>
		<TableStyled>{children}</TableStyled>
	</TableWrapper>
);

export const Head = styled.thead`
	${typographyStyles.ButtonLabel}
`;

export const Row = undefined;
