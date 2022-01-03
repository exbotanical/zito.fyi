import { useEffect, useState } from 'react';

import { KEYS } from '.';

type IThemeState = 'dark' | 'light';

export const useTheme = () => {
	const [theme, setTheme] = useState<IThemeState>('light');

	const setPersistedTheme = (mode: IThemeState) => {
		localStorage.setItem(KEYS.THEME_STORAGE_KEY, mode);

		setTheme(mode);
	};

	const toggleTheme = () => {
		if (theme === 'dark') {
			document.body.classList.remove('theme-dark');
			document.body.classList.add('theme-light');
			setPersistedTheme('light');
		} else {
			document.body.classList.remove('theme-light');
			document.body.classList.add('theme-dark');
			setPersistedTheme('dark');
		}
	};

	// we must grab the initial value from localStorage here, because the build runtime is isomorphic
	// once `useEffect` runs, we can be confident we are in the browser
	useEffect(() => {
		const localTheme = localStorage.getItem(KEYS.THEME_STORAGE_KEY);

		if (localTheme) {
			setTheme(localTheme as IThemeState);
			document.body.classList.add(`theme-${localTheme}`);
		} else {
			// set default
			localStorage.setItem(KEYS.THEME_STORAGE_KEY, 'light');
		}
	}, []);

	return { setTheme: toggleTheme, theme };
};
