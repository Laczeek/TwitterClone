import { FetchedPostType, PostType, TokenType } from '../../models/interfaces';
import { XMarkIcon } from '@heroicons/react/24/solid';

import Modal from '../ui/Modal';
import PostForm from './PostForm';

interface CommentModalPropsType {
	closeModal: () => void;
	userDetails: TokenType;
	postDetails: FetchedPostType | PostType;
	howMuchTimeAgo: string;
	onSubmit: (event: React.FormEvent<HTMLFormElement>, message: string) => void;
}

const CommentModal = ({ closeModal, userDetails, postDetails, howMuchTimeAgo, onSubmit }: CommentModalPropsType) => {
	return (
		<Modal closeModal={closeModal}>
			<div
				className='absolute top-[50%] sm:top-[30%]  translate-y-[-50%]   dark:bg-black bg-white  drop-shadow-[0_0_3px_#ffffffd6] rounded-2xl overflow-hidden w-[90%] sm:w-[70%]  max-w-[600px] '
				onClick={event => event.stopPropagation()}>
				<div className='p-2 border-b border-gray-border flex items-center'>
					<button
						onClick={event => {
							event.stopPropagation();
							closeModal();
						}}
						className='p-1'>
						<XMarkIcon className='w-6 h-6 dark:text-white text-black' />
					</button>
				</div>

				<div className=' dark:text-white text-black p-4'>
					<div className='relative flex before:w-[2px] before:h-[120%] before:bg-gray-light before:absolute before:content-[""] before:left-[1.45rem] before:top-11 before:-z-10 '>
						<img src={postDetails.photoURL} className='h-12 w-12 rounded-full mr-4' />
						<p>
							<span className='font-bold mr-2'>{postDetails.name}</span>
							<span className='text-sm opacity-40'>
								{postDetails.identyfier} - {howMuchTimeAgo}
							</span>
							<span className='block break-all'>{postDetails.message}</span>
						</p>
					</div>
				</div>
				<div className='p-1'>
					<PostForm
						onSubmit={onSubmit}
						userPhoto={userDetails.photoURL}
						buttonText='Comment'
						placeholderText='Add comment...'
					/>
				</div>
			</div>
		</Modal>
	);
};

export default CommentModal;
