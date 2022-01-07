import React from 'react';
import styled, { css } from 'styled-components';

import { WidthWrapper } from '@/components/Post/PostSpacing';
import { typographyStyles } from '@/theme';

interface TableProps {
	children?: React.ReactNode;
}

interface CellProps {
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

const SharedCellCSS = css<CellProps>`
	padding-top: 8px;
	padding-right: 16px;
	padding-bottom: 4px;
	padding-left: 16px;
	text-align: ${({ align }) => align};
`;

export const HeadCell = styled.th<CellProps>`
	${SharedCellCSS}

	border-bottom: 2px solid var(--color-text, rgb(0, 0, 0));
	margin-right: 4px;
	margin-left: 4px;
`;

export const BodyCell = styled.td<CellProps>`
	${SharedCellCSS}

	padding-top: 8px;
	padding-right: 16px;
	padding-bottom: 4px;
	padding-left: 16px;
	border-bottom: 1px solid var(--color-grey-300, rgb(12, 105, 121));

	:hover {
		background-color: var(--color-grey-100, rgb(10, 49, 68));
	}
`;

export const Body = styled.tbody`
	${typographyStyles.Body}
`;

export function Table({ children }: TableProps): JSX.Element {
	return (
		<TableWrapper>
			<TableStyled>{children}</TableStyled>
		</TableWrapper>
	);
}

export const Head = styled.thead`
	${typographyStyles.ButtonLabel}
`;

export const Row = undefined;
