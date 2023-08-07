import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { uiActions } from '../../store/ui-slice';
import { AppDispatchType } from '../../store/store';
import { Bars3Icon } from '@heroicons/react/24/outline';

import ThemeSwitcher from './ThemeSwitcher';

interface TitlePropsType {
	title: string;
	isArrowNeeded: boolean;
}

const Title = ({ title, isArrowNeeded }: TitlePropsType): JSX.Element => {
	const dispatch: AppDispatchType = useDispatch();

	const showNavigationHandler = () => {
		dispatch(uiActions.toggleNavigation());
	};

	return (
		<div className='flex justify-between items-center border-b border-gray-border p-3 px-4'>
			<button className='p-1 sm:hidden' onClick={showNavigationHandler}>
				<Bars3Icon className='h-7 w-7 text-blue  ' />
			</button>

			{isArrowNeeded && (
				<Link to='/home'>
					<ArrowLeftOnRectangleIcon className='dark:text-white text-black h-6 w-6 hover:text-blue' />
				</Link>
			)}

			<ThemeSwitcher />

			<p className='dark:text-gray-extraLight text-gray-dark text-xl font-bold'>{title}</p>
		</div>
	);
};

export default Title;
