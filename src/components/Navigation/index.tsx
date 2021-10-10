import React from 'react';

import { Moon, Sun } from '../icons';
import { useConfig } from '@/config';
import * as Styles from '@/components/Navigation/styles';

interface INavigationProps {
	theme: 'light' | 'dark';
	setTheme: () => void;
}

export const Navigation = ({
	theme,
	setTheme
}: INavigationProps): JSX.Element => {
	const config = useConfig();

	return (
		<Styles.Wrapper>
			<Styles.HomeButton to="/">
				{/* TODO logo */}
				<Styles.SiteTitle>{config.site.titleAbridged}</Styles.SiteTitle>
			</Styles.HomeButton>

			{theme === 'light' ?
				(
					<Moon height={20} onClick={() => setTheme()} />
				) :
				(
					<Sun height={20} onClick={setTheme} />
				)}
		</Styles.Wrapper>
	);
};
