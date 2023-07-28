import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { AppDispatchType } from '../../store/store';
import { Bars3Icon } from '@heroicons/react/24/outline';

import ThemeSwitcher from './ThemeSwitcher';

const Title = (): JSX.Element => {
	const dispatch: AppDispatchType = useDispatch();

	const showNavigationHandler = () => {
		dispatch(uiActions.toggleNavigation());
	};

	return (
		<div className='flex justify-between items-center border-b border-gray-border p-3 px-4'>
			<button className='p-1 sm:hidden' onClick={showNavigationHandler}>
				<Bars3Icon className='h-7 w-7 text-blue  ' />
			</button>

			<ThemeSwitcher />

			<p className='dark:text-gray-extraLight text-gray-dark text-xl font-bold'>Home</p>
		</div>
	);
};

export default Title;

// ADD TITLE TEXT BASED ON LINK
