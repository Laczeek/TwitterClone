import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

const ThemeSwitcher = (): JSX.Element => {
	const [theme, setTheme] = useState<'dark' | 'light'>(
		((localStorage.getItem('theme') as 'dark') || 'light') ?? 'dark'
	);

	const changeThemeHandler = () => {
		setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
	};

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<button onClick={changeThemeHandler}>
			{theme === 'dark' ? <SunIcon className='h-6 w-6 text-white' /> : <MoonIcon className='h-6 w-6 text-black' />}
		</button>
	);
};

export default ThemeSwitcher;
