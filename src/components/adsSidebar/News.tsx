import { NewsType } from '../../models/interfaces';

const News = ({ title, text, tags }: NewsType) => {
	return (
		<a href='#' className='block linkHoverAnimation px-3 py-2 mb-2'>
			<div>
				<p className='text-gray-light text-xs'>{title}</p>
				<p className='text-sm'>{text}</p>
				<p className='text-xs text-gray-light'>
					Trending with{' '}
					{tags.map((tag, index) => (
						<button key={index} className='text-blue mr-1 hover:underline'>
							{tag}
						</button>
					))}
				</p>
			</div>
		</a>
	);
};

export default News;
