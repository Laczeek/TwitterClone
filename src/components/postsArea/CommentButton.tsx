import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { CommentPostType } from '../../models/interfaces';

interface CommentButtonPropsType {
    showModal: () => void;
	comments: object;
	userId: string;
}

const CommentButton = ({ comments, userId, showModal }: CommentButtonPropsType): JSX.Element => {
	const commentsLength = comments && Object.keys(comments).length;
	const isMyCommentAdded =
		comments && Object.values(comments as CommentPostType[]).find(comment => comment.userId === userId);

	return (
		<div>
			<button
				onClick={event => {
                    event.preventDefault();
                    showModal();
				}}
				type='button'
				className='group rounded-full p-2 hover:bg-icons-blue hover:bg-opacity-30 transition-colors duration-200 '>
				<div className='flex items-center'>
					<ChatBubbleOvalLeftEllipsisIcon
						className={`h-5 w-5 ${
							isMyCommentAdded ? 'text-blue' : 'text-gray-light'
						}  pointer-events-none group-hover:text-icons-blue transition-colors duration-200`}
					/>
					{comments && <span className='text-sm ml-1 text-gray-light'>{commentsLength}</span>}
				</div>
			</button>
		</div>
	);
};

export default CommentButton;
