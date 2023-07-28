interface AdsWrapperPropsTypes {
	title: string;
	children: React.ReactNode;
}

const AdsWrapper = ({ title, children }: AdsWrapperPropsTypes): JSX.Element => {
	return (
		<div className='dark:bg-gray-dark bg-gray-extraLight  dark:text-white text-black overflow-hidden  rounded-2xl '>
			<h2 className='text-2xl font-bold px-3 py-2'>{title}</h2>

			{children}

			<a href='#' className='text-blue block linkHoverAnimation px-3 py-2'>
				Show more
			</a>
		</div>
	);
};

export default AdsWrapper;
