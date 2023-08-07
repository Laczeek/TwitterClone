import { TrashIcon } from '@heroicons/react/24/outline';
import { auth, database } from '../../firebase/firebaseConfig';
import { ref, remove } from 'firebase/database';
import { useSubmit } from 'react-router-dom';

interface DeleteButtonPropsType {
	postId: string;
	userId: string;
    commentId?: string;
}

const DeleteButton = ({ postId, userId, commentId }: DeleteButtonPropsType): JSX.Element => {
	const submit = useSubmit();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		void deleteHandler();
	};

	const deleteHandler = async () => {
		if (auth.currentUser && auth.currentUser.uid === userId) {
			try {
				let postRef = ref(database, `/posts/${postId}`);

                if(commentId) {
                    postRef = ref(database, `/posts/${postId}/comments/${commentId}`)
                }

				const procced = window.confirm('Are you sure?');
				if (procced) {
					await remove(postRef);
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
