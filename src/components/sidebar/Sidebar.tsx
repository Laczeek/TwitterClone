import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootStateType } from '../../store/store';
import { AppDispatchType } from '../../store/store';
import { uiActions } from '../../store/ui-slice';
import useModal from '../../hooks/useModal';

import {
	HomeIcon,
	HashtagIcon,
	BellIcon,
	EnvelopeIcon,
	UserIcon,
	EllipsisHorizontalCircleIcon,
	XMarkIcon,
	EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

import SidebarLogo from './SidebarLogo';
import SidebarLink from './SidebarLink';
import LogoutModal from './LogoutModal';

const LINKS = [
	{ text: 'Home', icon: HomeIcon, href: '/home' },
	{ text: 'Explore', icon: HashtagIcon, href: '/home/most-liked' },
	{ text: 'Messages', icon: EnvelopeIcon, href: '/home' },
	{ text: 'Profile', icon: UserIcon, href: '/home' },
	{ text: 'More', icon: EllipsisHorizontalCircleIcon, href: '/home' },
];

const Sidebar = (): JSX.Element => {
	const [isShowingModal, toggleModalHandler] = useModal();
	const userData = useSelector((state: RootStateType) => state.user.userToken);
	const isNavShowing = useSelector((state: RootStateType) => state.ui.isNavShowing);
	const dispatch: AppDispatchType = useDispatch();

	const hideNavigationHandler = () => {
		dispatch(uiActions.toggleNavigation());
	};

	const openLogoutModal = () => {
		hideNavigationHandler();
		void toggleModalHandler();
	};

	return (
		<nav
			className={` ${
				isNavShowing ? 'translate-x-[0] ' : 'translate-x-[-100%] sm:translate-x-[0]'
			} fixed flex z-30 top-0 left-0 p-2 flex-col items-center justify-between  dark:bg-background-black bg-background-white transition-transform duration-300   h-screen sm:w-auto  sm:sticky sm:transition-none w-[70%]`}>
			{isShowingModal && <LogoutModal closeModal={toggleModalHandler} />}

			<div className='w-full'>
				<div className='mt-1  flex justify-between sm:inline-block sm:mr-auto sm:w-auto'>
					<SidebarLogo />

					<button className='p-1 sm:hidden' onClick={hideNavigationHandler}>
						<XMarkIcon className='h-7 w-7 text-blue ' />
					</button>
				</div>

				<div className='w-fit mt-1 mb-2 '>
					{LINKS.map((link, index) => (
						<SidebarLink key={index} link={link} closeNav={hideNavigationHandler} />
					))}
				</div>
				<div className='w-full hidden xl:block'>
					<Link
						className='btn text-lg w-full text-center'
						to='/home'
						onClick={() => {
							document.body.scrollTop = 0;
							document.documentElement.scrollTop = 0;
						}}>
						Tweet
					</Link>
				</div>
			</div>
			<button className='linkHoverAnimation mb-1 rounded-full   xl:py-2 xl:px-4' onClick={openLogoutModal}>
				<div className='dark:text-white text-black  xl:flex xl:items-center xl:gap-x-2'>
					<img src={userData?.photoURL} className='h-11 w-11 rounded-full' />
					<div className='hidden xl:block'>
						<p className='font-bold'>{userData?.name}</p>
						<p className='text-sm opacity-40'>{userData?.identyfier}</p>
					</div>
					<EllipsisHorizontalIcon className='hidden xl:block h-5 w-5 dark:text-white text-black' />
				</div>
			</button>
		</nav>
	);
};

export default Sidebar;
