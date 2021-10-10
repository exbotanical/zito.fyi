import React from 'react';
import styled from 'styled-components';

import { SIDE_PADDING } from '@/components/Post/PostSpacing';

const FOOTNOTE_CONTENT_WIDTH = '920px';
const FOOTNOTE_SIZE = `calc(${FOOTNOTE_CONTENT_WIDTH} + 2 * ${SIDE_PADDING})`;

interface IFootnoteProps {
	className?: string;
	children: React.ReactChildren;
}

export const Wrapper = styled.div`
	width: 100%;
	max-width: 100%;

	@media (min-width: ${FOOTNOTE_SIZE}) {
		max-width: ${FOOTNOTE_SIZE};
		padding: 0 16px;
		border-radius: 6px !important;
	}
`;

export const Footnote = ({
	className,
	children
}: IFootnoteProps): JSX.Element => (
	<Wrapper className={className} tabIndex={0}>
		{children}
	</Wrapper>
);
