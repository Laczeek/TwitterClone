import { useRouteError } from 'react-router-dom';
import Title from '../components/ui/Title';

const ErrorPage = (): JSX.Element => {
	const error = useRouteError() as { data: { message: string }; status: number };

	let errorTitle = 'Error occured!';
	let errorMessage = 'Something went wrong...';

	if (error.status === 404) {
		errorTitle = 'Not found!';
		errorMessage = 'Could not find resource or page.';
	}

	return (
		<main className='container mx-auto max-w-[1400px] min-h-screen flex xl:px-6  xl:gap-x-4'>
			<div className='grow  border-l border-r sm:border-gray-border'>
				<Title title='Error' isArrowNeeded={true} />
				<p className='text-2xl text-center mt-5 font-bold dark:text-white text-black'>{errorTitle}</p>
				<p className='text-xl text-center mt-5 font-bold dark:text-white text-black'>{errorMessage}</p>
			</div>
		</main>
	);
};

export default ErrorPage;
