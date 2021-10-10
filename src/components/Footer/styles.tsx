import styled from 'styled-components';

export const Wrapper = styled.footer`
	display: grid;
	align-items: center;
	padding: 32px 0 16px;
	background-color: var(--color-grey-100);
	color: var(--color-grey-700);
	gap: 40px;
	justify-items: center;
`;

export const LinkGrid = styled.section`
	display: inline-grid;
	align-items: center;
	gap: 12px;
	justify-items: center;
`;

export const Info = styled.div`
	display: grid;
	align-items: center;
	gap: 8px;
	justify-items: center;

	& a {
		color: var(--color-primary-600);

		:hover {
			color: var(--color-primary-600);
		}
	}
`;
