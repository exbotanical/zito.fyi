import { createGlobalStyle, css } from 'styled-components';

const Colors = css`
	:root {
		--color-primary: ${(props) => props.theme.colorprimary};
		--color-primary-100: ${(props) => props.theme.colorprimary100};
		--color-primary-200: ${(props) => props.theme.colorprimary200};
		--color-primary-300: ${(props) => props.theme.colorprimary300};
		--color-primary-400: ${(props) => props.theme.colorprimary400};
		--color-primary-600: ${(props) => props.theme.colorprimary600};
		--color-primary-700: ${(props) => props.theme.colorprimary700};
		--color-primary-800: ${(props) => props.theme.colorprimary800};
		--color-primary-900: ${(props) => props.theme.colorprimary900};
		--color-grey-100: ${(props) => props.theme.colorgrey100};
		--color-grey-200: ${(props) => props.theme.colorgrey200};
		--color-grey-300: ${(props) => props.theme.colorgrey300};
		--color-grey-400: ${(props) => props.theme.colorgrey400};
		--color-grey-500: ${(props) => props.theme.colorgrey500};
		--color-grey-600: ${(props) => props.theme.colorgrey600};
		--color-grey-700: ${(props) => props.theme.colorgrey700};
		--color-grey-800: ${(props) => props.theme.colorgrey800};
		--color-grey-900: ${(props) => props.theme.colorgrey900};
		--color-text: ${(props) => props.theme.colortext};
		--color-inverted-text: ${(props) => props.theme.colortextinverted};
		--color-background: ${(props) => props.theme.colorbg};
		--color-inverted-background: ${(props) => props.theme.colorbginverted};
	}
`;

export const Color = createGlobalStyle`
		${Colors}
`;
