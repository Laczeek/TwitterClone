import { Outlet } from 'react-router-dom';

import Sidebar from '../components/sidebar/Sidebar';
import AdsSidebar from '../components/adsSidebar/AdsSidebar';

const RootLayout = (): JSX.Element => {
	return (
		<main className='container mx-auto max-w-[1400px] min-h-screen flex xl:px-6  xl:gap-x-4'>
			<Sidebar />
			<div className='grow  border-l border-r sm:border-gray-border h-[2000px]'>
				<Outlet />
			</div>
			<AdsSidebar />
		</main>
	);
};

export default RootLayout;
