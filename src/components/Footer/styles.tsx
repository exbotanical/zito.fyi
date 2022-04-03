import styled from 'styled-components';

export const Wrapper = styled.footer`
	display: grid;
	align-items: center;
	padding: 32px 0 16px;
	background-color: ${({ theme }) => theme.colors.b2};
	color: ${({ theme }) => theme.colors.p6};
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
	color: ${({ theme }) => theme.colors.b3};
`;
