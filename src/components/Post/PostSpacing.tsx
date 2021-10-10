import styled, { css } from 'styled-components';

const POST_CONTENT_WIDTH = '736px';

export const SIDE_PADDING = '16px';
export const POST_WIDTH = `calc(${POST_CONTENT_WIDTH} + 2 * ${SIDE_PADDING})`;

// equivalent to `WrapperCss` save for the removal of padding once under max-width
const ExtendingCss = css`
	width: 100%;
	padding: 0;

	@media (min-width: ${POST_WIDTH}) {
		max-width: ${POST_WIDTH};
		padding: 0 16px;
	}
`;

export const WrapperCss = css`
	width: 100%;
	max-width: ${POST_WIDTH};
	padding: 0 16px;
`;

export const ExtendingWrapper = styled.div`
	${ExtendingCss}
`;

export const WidthWrapper = styled.div`
	${WrapperCss}
`;
