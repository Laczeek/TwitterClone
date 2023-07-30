import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { push, ref, serverTimestamp } from 'firebase/database';

import { PhotoIcon } from '@heroicons/react/24/outline';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';

import PickerModal from './PickerModal';
import TweetButton from '../ui/TweetButton';
import { RootStateType } from '../../store/store';
import { auth, database } from '../../firebase/firebaseConfig';

const AddPostForm = (): JSX.Element => {
	const userData = useSelector((state: RootStateType) => state.user.userToken);
	const [message, setMessage] = useState<string>('');
	const [isModal, setIsModal] = useState(false);
	const navigate = useNavigate();
	const photoRef = useRef<HTMLInputElement>(null);
	const emojiButtonRef = useRef<HTMLButtonElement>(null);

	const onAddEmoji = (emoji: string) => {
		setMessage(prevMessage => prevMessage + emoji);
	};

	const showModalHandler = () => {
		setIsModal(true);
	};

	const hideModalHandler = (event: Event) => {
		if (event.target === emojiButtonRef.current) {
			return;
		}
		setIsModal(false);
	};

	const handleButtonClick = (event: FormEvent) => {
		event.preventDefault();
		void addPostHandler();
	};

	const addPostHandler = async (): Promise<void> => {
		if (auth.currentUser && message.trim().length !== 0) {
			try {
				await push(ref(database, 'posts/'), {
					uid: userData?.userId,
					email: userData?.email,
					name: userData?.name,
					photoURL: userData?.photoURL,
					message,
					whenAdded: serverTimestamp(),
				});
				setMessage('');
			} catch (error) {
				window.alert('Something went wrong, please try to refresh page...')
			}
		} else {
			window.alert('Something has gone wrong, you will be redirected to the login page.');
			setTimeout(() => {
				navigate('/');
			}, 1000);
		}
	};

	return (
		<form className='flex gap-x-6 p-3 border-b border-gray-border' onSubmit={handleButtonClick}>
			{isModal && <PickerModal onAddEmoji={onAddEmoji} hideModal={hideModalHandler} />}
			<img src={userData?.photoURL} className='h-12 w-12 rounded-full' />

			<div className=' grow mt-2'>
				<textarea
					placeholder='Write your message...'
					rows={3}
					maxLength={280}
					className='w-full px-2  dark:text-white text-black  bg-transparent border-b border-gray-border outline-none tracking-wide text-base resize-none'
					value={message}
					onChange={event => setMessage(event.target.value)}></textarea>
				<div className='flex justify-between items-center mt-2'>
					<div>
						<button type='button' onClick={() => photoRef.current?.click()}>
							<PhotoIcon className='h-6 w-6 text-blue  mx-2 hover:opacity-80 transition-opacity duration-200 pointer-events-none' />
							<input type='file' hidden ref={photoRef} />
						</button>
						<button type='button' onClick={showModalHandler} ref={emojiButtonRef}>
							<FaceSmileIcon className='h-6 w-6 text-blue mx-2 hover:opacity-80 transition-opacity duration-200 pointer-events-none' />
						</button>
						<button type='button'>
							<CalendarIcon className='h-6 w-6 text-blue mx-2 hover:opacity-80 transition-opacity duration-200 pointer-events-none' />
						</button>
					</div>
					<TweetButton fontSize='16px' disabled={Boolean(!message.length)} isTypeSubmit={true} />
				</div>
			</div>
		</form>
	);
};

export default AddPostForm;
