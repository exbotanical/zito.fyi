import styled from 'styled-components';

import { Socials } from '@/components/Socials';
import { H3 } from '@/theme';
import { Separator } from '@/components/Separator';

const SM_BREAKPOINT = '500px';

export const Wrapper = styled.aside`
	display: grid;
	padding: 0 16px;
	justify-items: center;
	justify-self: center;
`;

export const Main = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-gap: 32px;
	justify-items: center;

	@media (max-width: ${SM_BREAKPOINT}) {
		grid-auto-flow: row;
	}
`;

export const Info = styled.div`
	display: grid;
	align-content: flex-start;
	justify-content: flex-start;
	grid-gap: 16px;

	@media (max-width: ${SM_BREAKPOINT}) {
		justify-content: center;
		grid-auto-flow: row;
	}
`;

export const Contact = styled.div`
	display: grid;
	align-content: center;
	align-items: center;
	margin-top: 8px;
	grid-auto-flow: column;
	grid-gap: 24px;

	@media (max-width: ${SM_BREAKPOINT}) {
		justify-content: center;
		margin-top: 32px;
		grid-auto-flow: row;
		grid-gap: 8px;
		justify-items: center;
	}
`;

export const Avatar = styled.img`
	overflow: hidden;
	width: 128px;
	height: 128px;
	border-radius: 50%;
`;

export const ShareLabel = styled(H3)`
	color: var(--color-grey-600, rgb(218, 59, 59));
	line-height: 100%;
`;

export const AuthorName = styled(H3)`
	color: var(--color-primary-100, rgb(251, 248, 228));
`;

export const AboutText = styled.div`
	width: 0;
	min-width: 100%;
	align-self: center;

	@media (max-width: ${SM_BREAKPOINT}) {
		& > p {
			text-align: justify;
		}
	}
`;

export const CompactSocials = styled(Socials)`
	grid-gap: 12px;
`;

export const AuthorSeparator = styled(Separator)`
	margin-top: 8px;
`;
