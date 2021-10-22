import React from 'react';

import { Moon, Sun } from '../icons';
import { useConfig } from '@/config';
import * as S from '@/components/Navigation/styles';
import { useTheme } from '@/theme';

export const Navigation = (): JSX.Element => {
	const config = useConfig();
	const { theme, setTheme } = useTheme();

	return (
		<S.Wrapper>
			<S.HomeButton to="/">
				{/* TODO logo */}
				<S.SiteTitle>{config.site.titleAbridged}</S.SiteTitle>
			</S.HomeButton>

			<S.ThemeButton
				role="button"
				tabIndex={0}
				onClick={setTheme}
				onKeyPress={setTheme}
			>
				{theme === 'light' ? <Moon height={20} /> : <Sun height={20} />}
			</S.ThemeButton>
		</S.Wrapper>
	);
};
