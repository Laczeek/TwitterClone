import { ref as dbRef, remove } from 'firebase/database';
import { useNavigate, useSubmit } from 'react-router-dom';

import { TrashIcon } from '@heroicons/react/24/outline';
import { auth, database, storage } from '../../firebase/firebaseConfig';
import { CommentPostType, FetchedPostType, PostType } from '../../models/interfaces';
import { deleteObject, ref } from 'firebase/storage';

interface DeleteButtonPropsType {
	post: FetchedPostType | PostType;
	comment?: CommentPostType;
}

const DeleteButton = ({ post, comment }: DeleteButtonPropsType): JSX.Element => {
	const submit = useSubmit();
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		void deleteHandler();
	};

	const deleteHandler = async () => {
		if (
			(auth.currentUser && auth.currentUser.uid === post.userId) ||
			(auth.currentUser && auth.currentUser.uid === comment?.userId) ||
			(auth.currentUser && auth.currentUser.uid === import.meta.env.VITE_ADMIN_ID)
		) {
			try {
				const procced = window.confirm('Are you sure?');
				if (procced) {
					let postRef = dbRef(database, `/posts/${post.id}`);

					if (comment) {
						postRef = dbRef(database, `/posts/${post.id}/comments/${comment.id}`);
						if (comment.commentFileUrl) {
							const commentFileRef = ref(storage, comment.commentFileUrl);
							await deleteObject(commentFileRef);
						}
					}

					if (!comment) {
						if (post.postFileUrl) {
							const fileRef = ref(storage, post.postFileUrl);
							await deleteObject(fileRef);
						}
						if (post.comments) {
							const comments: CommentPostType[] = [];

							for (const [key, value] of Object.entries(post.comments)) {
								const comment = { id: key, ...value } as CommentPostType;
								comments.push(comment);
							}

							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							const deletePromises = comments.map(comment => {
								if (comment.commentFileUrl) {
									const commentFileRef = ref(storage, comment.commentFileUrl);
									return deleteObject(commentFileRef);
								}
							});

							await Promise.all(deletePromises);
						}
					}
					await remove(postRef);
					navigate('/home');
				} else {
					return;
				}
			} catch (error) {
				console.log(error);
				window.alert('Delete post failed!');
			}
		} else {
			return submit(null, { method: 'post', action: '/logout' });
		}
	};

	return (
		<button
			type='button'
			onClick={event => handleClick(event)}
			className='group rounded-full p-2 hover:bg-icons-blue hover:bg-opacity-30 transition-colors duration-200'>
			<TrashIcon className='h-5 w-5 text-gray-light pointer-events-none group-hover:text-icons-blue transition-colors duration-200' />
		</button>
	);
};

export default DeleteButton;
