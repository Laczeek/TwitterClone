import { useSubmit } from 'react-router-dom';
import { ref as dbRef, push, serverTimestamp } from 'firebase/database';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import * as uuid from 'uuid';

import { auth, database, storage } from '../../firebase/firebaseConfig';
import { ArrowsRightLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { FetchedPostType, PostType, TokenType } from '../../models/interfaces';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeleteButton from './DeleteButton';
import useModal from '../../hooks/useModal';
import CommentModal from './CommentModal';
import useDate from '../../hooks/useDate';

interface PostPropsType {
	post: FetchedPostType | PostType;
	userData: TokenType;
}

const Post = ({ post, userData }: PostPropsType): JSX.Element => {
	console.log('POST');
	const submit = useSubmit();
	const howMuchTimeAgo = useDate(post.whenAdded);
	const [isModalShowing, toggleModalHandler] = useModal();

	const handleCommentClick = (event: React.FormEvent<HTMLFormElement>, message: string, file: string | null) => {
		event.preventDefault();
		void addCommentHandler(message, file);
	};

	const addCommentHandler = async (message: string, file: string | null) => {
		if (auth.currentUser) {
			try {
				const commentRef = dbRef(database, `/posts/${post.id}/comments`);
				let comment: any = {
					name: userData.name,
					message,
					userId: userData.userId,
					identyfier: userData.identyfier,
					photoURL: userData.photoURL,
					whenAdded: serverTimestamp(),
				};

				if (file) {
					const generatedId = uuid.v4();
					const storageRef = ref(storage, `images/${generatedId}`);
					await uploadString(storageRef, file, 'data_url');
					const fileUrl = await getDownloadURL(storageRef);
					comment = {
						name: userData.name,
						message,
						userId: userData.userId,
						identyfier: userData.identyfier,
						commentFileUrl: fileUrl,
						photoURL: userData.photoURL,
						whenAdded: serverTimestamp(),
					};
				}

				await push(commentRef, comment);
				toggleModalHandler();
			} catch (error) {
				console.log(error);
				window.alert('Add comment failed!');
			}
		} else {
			return submit(null, { method: 'post', action: '/logout' });
		}
	};

	return (
		<div className='flex  gap-x-6 p-3 border-b border-gray-border hover:postHoverAnimation'>
			{isModalShowing && (
				<CommentModal
					closeModal={toggleModalHandler}
					postDetails={post}
					userDetails={userData}
					howMuchTimeAgo={howMuchTimeAgo}
					onSubmit={handleCommentClick}
				/>
			)}
			<img src={post.photoURL} className='h-12 w-12 rounded-full' />

			<div className='grow mt-2 dark:text-white text-black'>
				<p>
					<span className='font-bold mr-2'>{post.name}</span>
					<span className='text-sm opacity-40'>
						{post.identyfier} - {howMuchTimeAgo}
					</span>
				</p>

				<p className='mt-3 mb-4 break-all'>{post.message}</p>

				{post?.postFileUrl && (
					<img src={post.postFileUrl} className='my-4 rounded-xl max-h-[600px]   mx-auto  w-full object-cover' />
				)}

				<div className='flex justify-between items-center'>
					<CommentButton comments={post.comments} userId={userData.userId} showModal={toggleModalHandler} />
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-green hover:bg-opacity-30 transition-colors duration-200'>
						<ArrowsRightLeftIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-green transition-colors duration-200' />
					</button>
					<LikeButton likes={post.likes} id={post.id} userId={userData.userId} />
					<button
						type='button'
						className='group rounded-full p-2 hover:bg-icons-blue hover:bg-opacity-30 transition-colors duration-200'>
						<ShareIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-blue transition-colors duration-200' />
					</button>
				</div>
			</div>
			{(post.uid === userData.userId || userData.userId === import.meta.env.VITE_ADMIN_ID) && (
				<div className='self-start'>
					<DeleteButton post={post} />
				</div>
			)}
		</div>
	);
};

export default Post;
