import avatar from '../../assets/avatarImg.png';

import { ChatBubbleOvalLeftEllipsisIcon, ArrowsRightLeftIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';

const Post = (): JSX.Element => {
	return (
		<div className='flex gap-x-6 p-3 border-b border-gray-border'>
			<img src={avatar} className='h-12 w-12' />

			<div className='w-full mt-2 dark:text-white text-black'>
				<p>
					<span className='font-bold mr-2'>Patryk Popiela</span>
					<span className='text-sm opacity-40'>@patrykpopiela - 3 days ago</span>
				</p>
				<p className='mt-3 mb-4'>
					This is my first post :D This is my first post :D This is my first post :D This is my first post :D
				</p>
				<div className='flex justify-between '>
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-blue hover:bg-opacity-30 transition-colors duration-200'>
						<ChatBubbleOvalLeftEllipsisIcon className='h-5 w-5 text-gray-light  pointer-events-none group-hover:text-icons-blue transition-colors duration-200' />
					</button>
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-green hover:bg-opacity-30 transition-colors duration-200'>
						<ArrowsRightLeftIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-green transition-colors duration-200' />
					</button>
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-red hover:bg-opacity-30 transition-colors duration-200'>
						<HeartIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-red transition-colors duration-200' />
					</button>
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-blue hover:bg-opacity-30 transition-colors duration-200'>
						<ShareIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-blue transition-colors duration-200' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Post;
