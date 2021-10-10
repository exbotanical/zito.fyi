import styled, { css } from 'styled-components';

import { H1 } from '@/theme';

export const ScreenReaderOnlyCss = css`
	position: absolute !important;
	overflow: hidden;
	width: 1px;
	height: 1px;
	clip: rect(1px 1px 1px 1px);
	clip: rect(1px, 1px, 1px, 1px);
`;

export const ScreenReaderH1 = styled(H1)`
	${ScreenReaderOnlyCss}
`;
