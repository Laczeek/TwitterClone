import { useSubmit } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { push, ref, serverTimestamp } from 'firebase/database';

import { RootStateType } from '../../store/store';
import { auth, database } from '../../firebase/firebaseConfig';
import PostForm from './PostForm';

const AddPostForm = (): JSX.Element => {
	const userData = useSelector((state: RootStateType) => state.user.userToken);
	const submit = useSubmit();

	const handleAddPostClick = (event: React.FormEvent<HTMLFormElement>, message: string) => {
		event.preventDefault();
		void addPostHandler(message);
	};

	const addPostHandler = async (message: string): Promise<void> => {
		if (auth.currentUser || message.trim().length !== 0) {
			try {
				await push(ref(database, 'posts/'), {
					uid: userData?.userId,
					identyfier: userData?.identyfier,
					name: userData?.name,
					photoURL: userData?.photoURL,
					message,
					whenAdded: serverTimestamp(),
				});
			} catch (error) {
				console.log(error);
				window.alert('Add post failed!');
			}
		} else {
			window.alert('Something has gone wrong, you will be redirected to the login page.');
			setTimeout(() => {
				return submit(null, { method: 'post', action: '/logout' });
			}, 1000);
		}
	};

	return (
		<div className='border-b border-gray-border'>
			<PostForm
				onSubmit={handleAddPostClick}
				userPhoto={userData!.photoURL}
				buttonText='Tweet'
				placeholderText="What's happening?"
			/>
		</div>
	);
};

export default AddPostForm;
