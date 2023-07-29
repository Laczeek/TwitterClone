import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { PhotoIcon } from '@heroicons/react/24/outline';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';

import PickerModal from './PickerModal';
import TweetButton from '../ui/TweetButton';
import { RootStateType } from '../../store/store';

const AddPostForm = (): JSX.Element => {
	const userAvatar = useSelector((state: RootStateType) => state.user.userToken?.photoURL);

	const [message, setMessage] = useState<string>('');
	const [isModal, setIsModal] = useState(false);
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

	return (
		<form className='flex gap-x-6 p-3 border-b border-gray-border'>
			{isModal && <PickerModal onAddEmoji={onAddEmoji} hideModal={hideModalHandler} />}
			<img src={userAvatar} className='h-12 w-12 rounded-full' />

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
					<TweetButton fontSize='16px' disabled={true} />
				</div>
			</div>
		</form>
	);
};

export default AddPostForm;
