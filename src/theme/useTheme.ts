import { useEffect, useState } from 'react';

type IThemeState = 'light' | 'dark';

export const useTheme = () => {
	const [theme, setTheme] = useState<IThemeState>(
		(localStorage.getItem('theme') as IThemeState) || 'light'
	);

	const setPersistedTheme = (mode: IThemeState) => {
		localStorage.setItem('theme', mode);

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

	useEffect(() => {
		const localTheme = localStorage.getItem('theme');
		localTheme && setTheme(localTheme as IThemeState);
	}, []);

	return { theme, setTheme: toggleTheme };
};
