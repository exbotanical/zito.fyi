import React, { useContext } from 'react';

import * as S from '@/components/Navigation/styles';
import { ThemeToggleContext } from '@/styles/Theme';

import { Lambda, Moon, Sun } from '../icons';

export function Navigation(): JSX.Element {
	const { theme, toggleTheme } = useContext(ThemeToggleContext);

	return (
		<S.Wrapper>
			<S.HomeButton to="/">
				<Lambda data-testid="site_logo" height="35px" width="35px" />
			</S.HomeButton>

			<S.ThemeButton
				data-testid="theme_btn"
				onClick={toggleTheme}
				onKeyPress={toggleTheme}
				role="button"
				tabIndex={0}
				title="button"
			>
				{theme === 'light' ? <Moon height={20} /> : <Sun height={20} />}
			</S.ThemeButton>
		</S.Wrapper>
	);
}
