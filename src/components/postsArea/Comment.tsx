import { ArrowsRightLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { CommentPostType, PostType } from '../../models/interfaces';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import useDate from '../../hooks/useDate';

interface CommentPropsType {
	comment: CommentPostType;
	post: PostType;
	userId: string;
}

const Comment = ({ comment, post, userId }: CommentPropsType): JSX.Element => {
	const howMuchTimeAgo = useDate(comment.whenAdded);

	console.log(post.uid);
	console.log(userId);

	return (
		<div className='flex  gap-x-6 p-3 border-b border-gray-border hover:postHoverAnimation'>
			<img src={comment.photoURL} className='h-9 w-9 rounded-full' />

			<div className='grow mt-1 dark:text-white text-black'>
				<p>
					<span className='font-bold mr-2'>{comment.name}</span>
					<span className='text-sm opacity-40'>
						{comment.identyfier} - {howMuchTimeAgo}
					</span>
				</p>
				<p className='mt-2 mb-2 break-all'>{comment.message}</p>

				<div className='flex justify-between items-center'>
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-green hover:bg-opacity-30 transition-colors duration-200'>
						<ArrowsRightLeftIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-green transition-colors duration-200' />
					</button>
					<LikeButton likes={comment.likes} id={comment.id} userId={userId} postId={post.id} />
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-blue hover:bg-opacity-30 transition-colors duration-200'>
						<ShareIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-blue transition-colors duration-200' />
					</button>
				</div>
			</div>
			{comment.userId === userId && (
				<div className='self-start'>
					<DeleteButton postId={post.id} userId={userId} commentId={comment.id} />
				</div>
			)}
		</div>
	);
};

export default Comment;
