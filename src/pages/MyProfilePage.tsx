import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { getDownloadURL, ref as stRef, uploadString } from 'firebase/storage';
import { ref, set } from 'firebase/database';

import { AppDispatchType, RootStateType } from '../store/store';
import Title from '../components/ui/Title';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { auth, database, storage } from '../firebase/firebaseConfig';
import { userActions } from '../store/user-slice';
import { addTokenToLocalStorage, getTokenFromLocalStorage } from '../firebase/authHelpers';
import smallSpinner from '../assets/smallSpinner.svg';
import useTitle from '../hooks/useTitle';

const MyProfilePage = (): JSX.Element => {
	const userData = useSelector((state: RootStateType) => state.user.userToken);
	const dispatch: AppDispatchType = useDispatch();
	const submit = useSubmit();

	const [file, setFile] = useState<string | null>(null);
	const [imageIsLoading, setImageIsLoading] = useState(false);
	const [descIsLoading, setDescIsLoading] = useState(false);
	const [description, setDescription] = useState(userData!.description); // change this in future
	const photoRef = useRef<HTMLInputElement>(null);

	useTitle(userData?.name);

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

	const changeUserImage = async () => {
		if (auth.currentUser) {
			setImageIsLoading(true);
			if (file) {
				try {
					const storageRef = stRef(storage, `/usersImage/${userData!.userId}`);
					await uploadString(storageRef, file, 'data_url');
					const fileUrl = await getDownloadURL(storageRef);
					const token = getTokenFromLocalStorage();
					token!.photoURL = fileUrl;
					addTokenToLocalStorage(token!);
					setFile(null);
					location.reload();
				} catch (error) {
					console.log(error);
					window.alert('Change avatar failed!');
				}
			} else {
				window.alert('File not selected!');
			}
		} else {
			return submit(null, { method: 'post', action: '/logout' });
		}
		setImageIsLoading(false);
	};

	const changeUserDescription = async () => {
		if (auth.currentUser) {
			setDescIsLoading(true);
			if (description.trim().length > 0) {
				try {
					const databaseRef = ref(database, `/users/${userData!.userId}/description`);
					await set(databaseRef, description);
					dispatch(userActions.changeDescription(description));
					const token = getTokenFromLocalStorage();
					token!.description = description;
					addTokenToLocalStorage(token!);
				} catch (error) {
					console.log(error);
					window.alert('Change description failed!');
				}
			} else {
				window.alert("You can't add an empty description!");
			}
		} else {
			return submit(null, { method: 'post', action: '/logout' });
		}
		setDescIsLoading(false);
	};

	return (
		<>
			<Title title={userData!.name} isArrowNeeded={true} />

			<div className='mt-10 px-2 flex flex-col justify-center items-center'>
				<div className='relative text-center'>
					<img src={file ? file : userData?.photoURL} className='w-[150px] h-[150px] rounded-full object-cover' />
					<button type='button' onClick={() => photoRef.current?.click()} className='block ml-auto mb-2'>
						<PhotoIcon className='h-6 w-6 text-blue  mx-2 hover:opacity-80 transition-opacity duration-200 pointer-events-none' />
						<input type='file' hidden ref={photoRef} onChange={addImgToForm} />
					</button>
					{file && (
						<button className='btn mt-1' disabled={imageIsLoading} onClick={() => void changeUserImage()}>
							<div className='flex items-center  gap-x-1'>
								{!imageIsLoading ? (
									'Save?'
								) : (
									<>
										<p>Changing...</p>
										<img src={smallSpinner} />{' '}
									</>
								)}
							</div>
						</button>
					)}
					{file && (
						<button
							className='absolute top-2 right-2 rounded-full bg-black bg-opacity-40 group p-1'
							onClick={() => setFile(null)}>
							<XMarkIcon className='text-white w-8 h-8   shadow-inner rounded-full group-hover:rotate-180 transition-transform duration-500' />
						</button>
					)}
				</div>
				<div className='mt-10'>
					<div className='mb-2'>
						<p className='text-gray-light'>Your identyfier:</p>
						<p className='font-bold text-lg dark:text-white'>{userData?.identyfier}</p>
					</div>
					<div className='mb-2'>
						<p className='text-gray-light'>Your email adress:</p>
						<p className='font-bold text-lg dark:text-white'>{userData?.email}</p>
					</div>
					<form
						onSubmit={event => {
							event.preventDefault();
							void changeUserDescription();
						}}>
						<label className='text-gray-light'>Your profile description:</label>
						<textarea
							value={description}
							onChange={event => setDescription(event.target.value)}
							rows={5}
							maxLength={150}
							className='w-full px-2  dark:text-white  bg-transparent border border-gray-border rounded-md  outline-none tracking-wide text-base resize-none'></textarea>
						<p className='text-right text-sm opacity-40'>{description.length}/150</p>
						<button
							className='btn mt-1'
							disabled={descIsLoading || !description.trim().length || description === userData?.description}
							onClick={() => void changeUserDescription()}
							type='submit'>
							<div className='flex items-center gap-x-1'>
								{!descIsLoading ? (
									'Change description'
								) : (
									<>
										<p>Changing...</p>
										<img src={smallSpinner} />{' '}
									</>
								)}
							</div>
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default MyProfilePage;
