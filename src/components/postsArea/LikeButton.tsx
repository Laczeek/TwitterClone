import { ref, get, remove, set } from 'firebase/database';
import { auth, database } from '../../firebase/firebaseConfig';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useSubmit } from 'react-router-dom';

interface LikeButtonPropsType {
	likes: object;
	id: string;
	userId: string;
	postId?: string;
}

const LikeButton = ({ likes, id, userId, postId }: LikeButtonPropsType): JSX.Element => {
	const submit = useSubmit();
	const isLiked = likes && Object.keys(likes).includes(userId);
	const likesLength = likes && Object.keys(likes).length;

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		void likePostHandler();
	};

	const likePostHandler = async () => {
		if (auth.currentUser) {
			try {
				let href1 = `/posts/${id}/likes`;
				let href2 = `/posts/${id}/likes/${userId}`;

				// for comments
				if (postId) {
					href1 = `/posts/${postId}/comments/${id}/likes`;
					href2 = `/posts/${postId}/comments/${id}/likes/${userId}`;
				}

				const likesRef = ref(database, href1);
				const newLikeRef = ref(database, href2);

				const snapshot = await get(likesRef);

				if (snapshot.exists()) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					const likes = snapshot.val();
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, no-prototype-builtins
					if (!likes.hasOwnProperty(userId)) {
						await set(newLikeRef, true);
					} else {
						await remove(newLikeRef);
					}
				} else {
					await set(newLikeRef, true);
				}
			} catch (error) {
				console.log(error);
				window.alert('Add like failed!');
			}
		} else {
			return submit(null, { method: 'post', action: '/logout' });
		}
	};

	return (
		<button
			type='button'
			className='group rounded-full p-2 hover:bg-icons-red hover:bg-opacity-30 transition-colors duration-200'
			onClick={handleClick}>
			<div className='flex items-center'>
				{!isLiked ? (
					<HeartIconOutline
						className={`h-5 w-5 text-gray-light  pointer-events-none group-hover:text-icons-red transition-colors 
                    duration-200`}
					/>
				) : (
					<HeartIconSolid
						className={`h-5 w-5 text-icons-red  pointer-events-none group-hover:text-icons-red transition-colors 
                duration-200`}
					/>
				)}
				{likes && <span className='text-sm ml-1 text-gray-light'>{likesLength}</span>}
			</div>
		</button>
	);
};

export default LikeButton;
