import React, { useContext } from 'react';

import { Lambda, Moon, Sun } from '../icons';

import * as S from '@/components/Navigation/styles';
import { ThemeToggleContext } from '@/styles/Theme';

export function Navigation(): JSX.Element {
	const { theme, toggleTheme } = useContext(ThemeToggleContext);

	return (
		<S.Wrapper>
			<S.HomeButton to="/">
				<Lambda height="35px" width="35px" data-testid="site_logo" />
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
