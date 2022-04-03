import React, { useContext } from 'react';

import { Moon, Sun } from '../icons';

import * as S from '@/components/Navigation/styles';
import { useConfig } from '@/config';

import { ThemeToggleContext } from '@/styles/Theme';

export function Navigation(): JSX.Element {
	const config = useConfig();
	const { theme, toggleTheme } = useContext(ThemeToggleContext);

	return (
		<S.Wrapper>
			<S.HomeButton to="/">
				{/* TODO logo */}
				<S.SiteTitle>{config.site.titleAbridged}</S.SiteTitle>
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
