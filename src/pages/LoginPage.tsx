/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useActionData, useNavigate } from 'react-router-dom';
import { get, ref as dbRef, set } from 'firebase/database';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { useLayoutEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';

import { AppDispatchType } from '../store/store.ts';
import { userActions } from '../store/user-slice.ts';
import { auth, database, provider, storage } from '../firebase/firebaseConfig.ts';
import twitterLogo from '../assets/twitterLogoBig.png';
import { TokenType } from '../models/interfaces.ts';
import { addTokenToLocalStorage } from '../firebase/authHelpers.ts';

import smallSpinner from '../assets/smallSpinner.svg';

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatchType = useDispatch();
	const errors = useActionData() as FirebaseError;
	const [isLoading, setIsLoading] = useState(false);

	useLayoutEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme) {
			document.documentElement.classList.add(theme);
		}
	});

	const loginHandler = async () => {
		try {
			setIsLoading(true);
			const { user } = (await signInWithPopup(auth, provider)) as any;

			const email = user.email as string;
			const identyfier = '@' + email.replace('@gmail.com', '');

			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			const databaseRef = dbRef(database, `/users/${user.uid}`);

			const databaseUser = (await get(databaseRef)).val() as TokenType;
			let description = 'Hi :)';

			if (databaseUser) {
				description = databaseUser.description;
			}

			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			const storageRef = ref(storage, `usersImage/${user.uid}`);

			let image: string;
			try {
				const storageImage = await getDownloadURL(storageRef);
				image = storageImage;
			} catch (error) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				const res = await fetch(user.photoURL);
				if (!res.ok) {
					throw new Error('Something went wrong!!!');
				}
				const blob = await res.blob();

				await uploadBytes(storageRef, blob);
				image = await getDownloadURL(storageRef);
			}

			const userData: TokenType = {
				name: user.displayName,
				email,
				photoURL: image,
				userId: user.uid,
				expirationTime: user.stsTokenManager.expirationTime,
				identyfier,
				description,
			};

			if (!databaseUser) {
				await set(databaseRef, userData);
			}

			dispatch(userActions.login(userData));
			addTokenToLocalStorage(userData);
			navigate('/home');
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				return { errorCode, errorMessage };
			}
		}
		setIsLoading(false);
	};

	return (
		<div className='w-full h-screen flex justify-center items-center dark:text-white text-black'>
			<div className='  p-6 text-center rounded-md max-w-[300px]'>
				<img src={twitterLogo} className='w-[150px] mx-auto' />
				<h2 className='text-2xl font-bold my-4'>Join Twitter today.</h2>
				<button
					className='relative rounded-xl overflow-hidden z-10  bg-black text-white py-2 px-4  border-blue
                transition-colors duration-500
                before:absolute before:left-0 before:bottom-0 before:h-full before:w-[51%] before:origin-left  before:bg-blue before:-z-10
                before:scale-x-0 before:transition-transform before:duration-500
                after:absolute after:right-0 after:bottom-0 after:h-full after:w-[50%] after:origin-right  after:bg-blue after:-z-10
                after:scale-x-0 after:transition-transform after:duration-500
                hover:text-black hover:before:scale-x-[100%] hover:after:scale-x-[100%] 
                '
					disabled={isLoading}
					onClick={() => void loginHandler()}>
					<div className='flex items-center  gap-x-1'>
						{!isLoading ? (
							'Sign in with Google'
						) : (
							<>
								<p>Signing in...</p>
								<img src={smallSpinner} />{' '}
							</>
						)}
					</div>
				</button>

				{errors?.message && <p className='text-center mt-2'>{errors.message}</p>}
			</div>
		</div>
	);
};

export default LoginPage;
