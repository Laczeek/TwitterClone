import { useState, useRef, useEffect } from 'react';
import { PhotoIcon, FaceSmileIcon, CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PickerModal from './PickerModal';

interface PostFormPropsType {
	onSubmit: (event: React.FormEvent<HTMLFormElement>, message: string, file: string | null) => void;
	userPhoto: string;
	buttonText: string;
	placeholderText: string;
}

const PostForm = ({ onSubmit, userPhoto, buttonText, placeholderText }: PostFormPropsType): JSX.Element => {
	const [message, setMessage] = useState('');
	const [file, setFile] = useState<string | null>(null);
	const [isModal, setIsModal] = useState(false);

	const photoRef = useRef<HTMLInputElement>(null);
	const emojiButtonRef = useRef<HTMLButtonElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		textareaRef.current?.focus();
	}, []);

	const addImgToForm = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();

			reader.readAsDataURL(event.target.files[0]);

			reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
				if (readerEvent?.target?.result) {
					if (typeof readerEvent.target.result === 'string') {
						setFile(readerEvent.target.result);
					}
				}
			};
		}
	};

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
		<form
			className='flex gap-x-6 p-3  dark:text-white text-black '
			onSubmit={event => {
				onSubmit(event, message, file);
				setMessage('');
				setFile(null);
			}}>
			{isModal && <PickerModal onAddEmoji={onAddEmoji} hideModal={hideModalHandler} />}
			<img src={userPhoto} className='h-12 w-12 rounded-full' />

			<div className=' grow mt-2'>
				<textarea
					placeholder={placeholderText}
					rows={3}
					maxLength={280}
					className='w-full px-2   bg-transparent border-b border-gray-border outline-none tracking-wide text-base resize-none'
					value={message}
					ref={textareaRef}
					onChange={event => setMessage(event.target.value)}></textarea>
				<p className='text-right text-sm opacity-40'>{message.length}/280</p>
				{file && (
					<div className='my-4 relative'>
						<img src={file} className=' rounded-xl max-h-[300px]   object-cover ' />
						<button
							className='absolute top-2 right-2 rounded-full bg-black bg-opacity-40 group p-1'
							onClick={() => setFile(null)}>
							<XMarkIcon className='text-white w-8 h-8   shadow-inner rounded-full group-hover:rotate-180 transition-transform duration-500' />
						</button>
					</div>
				)}
				<div className='flex justify-between items-center mt-2'>
					<div>
						<button type='button' onClick={() => photoRef.current?.click()}>
							<PhotoIcon className='h-6 w-6 text-blue  mx-2 hover:opacity-80 transition-opacity duration-200 pointer-events-none' />
							<input type='file' hidden ref={photoRef} onChange={addImgToForm} />
						</button>
						<button type='button' onClick={showModalHandler} ref={emojiButtonRef}>
							<FaceSmileIcon className='h-6 w-6 text-blue mx-2 hover:opacity-80 transition-opacity duration-200 pointer-events-none' />
						</button>
						<button type='button'>
							<CalendarIcon className='h-6 w-6 text-blue mx-2 hover:opacity-80 transition-opacity duration-200 pointer-events-none' />
						</button>
					</div>
					<button className='btn' disabled={Boolean(!message.length)} type='submit'>
						{buttonText}
					</button>
				</div>
			</div>
		</form>
	);
};

export default PostForm;
