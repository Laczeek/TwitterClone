import { useSelector } from 'react-redux';
import { RootStateType } from '../store/store';
import { useEffect } from 'react';
import { Outlet, useSubmit } from 'react-router-dom';

import Sidebar from '../components/sidebar/Sidebar';
import AdsSidebar from '../components/adsSidebar/AdsSidebar';


const RootLayout = (): JSX.Element => {
	const userData = useSelector((state: RootStateType) => state.user.userToken);
	const submit = useSubmit();

	useEffect(() => {
		if (!userData) {
			return submit(null,{method: 'post', action: '/logout'});
		}
	}, [userData, submit]);



	return (
		<main className='container mx-auto  max-w-[1400px] min-h-screen flex xl:px-6  xl:gap-x-4 '>
			<Sidebar />
			<div className='grow border-l border-r sm:border-gray-border pb-3'>
				<Outlet />
			</div>
			<AdsSidebar />
		</main>
	);
};

export default RootLayout;
