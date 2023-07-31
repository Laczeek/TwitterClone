import { Component, ErrorInfo, ReactNode } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Title from './Title';

interface PropsType  {
    children : ReactNode
}

class ErrorBoundary extends Component<PropsType> {
	state = { hasError: false };

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.log(error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				<main className='container mx-auto max-w-[1400px] min-h-screen flex xl:px-6  xl:gap-x-4'>
					<Sidebar />
					<div className='grow  border-l border-r sm:border-gray-border'>
						<Title />
						<p className='text-2xl text-center mt-5 font-bold dark:text-white text-black'>Something went wrong!!!</p>
					</div>
				</main>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
