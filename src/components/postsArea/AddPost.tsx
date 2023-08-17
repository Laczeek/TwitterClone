import { useSubmit } from 'react-router-dom';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { push, ref as dbRef, serverTimestamp } from 'firebase/database';
import * as uuid from 'uuid';

import { auth, database, storage } from '../../firebase/firebaseConfig';
import PostForm from './PostForm';
import { TokenType } from '../../models/interfaces';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../store/store';
import { uiActions } from '../../store/ui-slice';

interface AddPostPropsType {
	userData: TokenType;
}

const AddPost = ({ userData }: AddPostPropsType): JSX.Element => {
	const submit = useSubmit();
	const dispatch: AppDispatchType = useDispatch();

	const handleAddPostClick = (event: React.FormEvent<HTMLFormElement>, message: string, file: string | null) => {
		event.preventDefault();
		void addPostHandler(message, file);
	};

	const addPostHandler = async (message: string, file: string | null): Promise<void> => {
		if (auth.currentUser && message.trim().length > 0) {
			dispatch(uiActions.changeBtnLoadingState(true));
			try {
				let post: any = {
					userId: userData.userId,
					identyfier: userData.identyfier,
					name: userData.name,
					photoURL: userData.photoURL,
					message,
					whenAdded: serverTimestamp(),
				};

				if (file) {
					const generatedId = uuid.v4();
					const storageRef = ref(storage, `images/${generatedId}`);
					await uploadString(storageRef, file, 'data_url');
					const fileUrl = await getDownloadURL(storageRef);
					post = {
						userId: userData.userId,
						identyfier: userData.identyfier,
						name: userData.name,
						photoURL: userData.photoURL,
						postFileUrl: fileUrl,
						message,
						whenAdded: serverTimestamp(),
					};
				}

				await push(dbRef(database, 'posts/'), post);
			} catch (error) {
				console.log(error);
				window.alert('Add post failed!');
			}
		} else {
			window.alert('Something has gone wrong, you will be redirected to the login page.');
			return submit(null, { method: 'post', action: '/logout' });
		}
		dispatch(uiActions.changeBtnLoadingState(false));
	};

	return (
		<div className='border-b border-gray-border'>
			<PostForm
				onSubmit={handleAddPostClick}
				userPhoto={userData.photoURL}
				buttonText='Tweet'
				placeholderText="What's happening?"
			/>
		</div>
	);
};

export default AddPost;
