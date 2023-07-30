import { ChatBubbleOvalLeftEllipsisIcon, ArrowsRightLeftIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { FetchedPostType } from '../../models/interfaces';

const MILLISECONDS_IN_MINUTE = 60000;
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_DAY = 86400000;

const Post = (props: FetchedPostType): JSX.Element => {
	const currentTime = new Date().getTime();
	const whenAdded = currentTime - props.whenAdded;
	let howMuchTimeAgo: string;

	if (whenAdded < MILLISECONDS_IN_HOUR) {
		howMuchTimeAgo = Math.ceil(whenAdded / MILLISECONDS_IN_MINUTE).toString() + ' minutes ago';
	} else if (whenAdded < MILLISECONDS_IN_DAY) {
		howMuchTimeAgo = Math.floor(whenAdded / MILLISECONDS_IN_HOUR).toString() + ' hours ago';
	} else {
		howMuchTimeAgo = Math.floor(whenAdded / MILLISECONDS_IN_DAY).toString() + ' days ago';
	}

	return (
		<div className='flex gap-x-6 p-3 border-b border-gray-border'>
			<img src={props.photoURL} className='h-12 w-12 rounded-full' />

			<div className='w-full mt-2 dark:text-white text-black'>
				<p>
					<span className='font-bold mr-2'>{props.name}</span>
					<span className='text-sm opacity-40'>
						{props.email.replace('gmail.com', '')} - {howMuchTimeAgo}
					</span>
				</p>
				<p className='mt-3 mb-4'>{props.message}</p>
				<div className='flex justify-between items-center'>
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-blue hover:bg-opacity-30 transition-colors duration-200 '>
						<div className='flex items-center'>
							<ChatBubbleOvalLeftEllipsisIcon className='h-5 w-5 text-gray-light  pointer-events-none group-hover:text-icons-blue transition-colors duration-200' />
							{props.comments && <span className='text-sm ml-1 text-gray-light'>{props.comments.length}</span>}
						</div>
					</button>
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-green hover:bg-opacity-30 transition-colors duration-200'>
						<ArrowsRightLeftIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-green transition-colors duration-200' />
					</button>
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-red hover:bg-opacity-30 transition-colors duration-200'>
						<div className='flex items-center'>
							<HeartIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-red transition-colors duration-200' />
							{props.likes && <span className='text-sm ml-1 text-gray-light'> {props.likes.length}</span>}
						</div>
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
