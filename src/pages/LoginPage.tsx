/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useActionData, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { useLayoutEffect } from 'react';
import { FirebaseError } from 'firebase/app';

import { AppDispatchType } from '../store/store.ts';
import { userActions } from '../store/user-slice.ts';
import { auth, provider } from '../firebase/firebaseConfig.ts';
import twitterLogo from '../assets/twitterLogoBig.png';
import { TokenType } from '../models/interfaces.ts';
import { addTokenToLocalStorage } from '../firebase/authHelpers.ts';

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatchType = useDispatch();
	const errors = useActionData() as FirebaseError;

	useLayoutEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme) {
			document.documentElement.classList.add(theme);
		}
	});

	const loginHandler = (): void => {
		signInWithPopup(auth, provider)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((result: any) => {
				const email = result.user.email as string;
				const identyfier = '@' + email.replace('@gmail.com', '');

				const user: TokenType = {
					name: result.user.displayName,
					email,
					photoURL: result.user.photoURL,
					userId: result.user.uid,
					expirationTime: result.user.stsTokenManager.expirationTime,
					identyfier,
				};
				dispatch(userActions.login(user));
				addTokenToLocalStorage(user);
				navigate('/home');
			})
			.catch((error: FirebaseError) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				return { errorCode, errorMessage };
			});
	};

	return (
		<div className='w-full h-screen flex justify-center items-center dark:text-white text-black'>
			<div className='  p-6 text-center rounded-md max-w-[300px]'>
				<img src={twitterLogo} className='w-[150px] mx-auto' />
				<h2 className='text-2xl font-bold my-4'>Join Twitter today.</h2>
				<button
					onClick={loginHandler}
					className='relative rounded-xl overflow-hidden z-10  bg-black text-white py-2 px-4  border-blue
                transition-colors duration-500
                before:absolute before:left-0 before:bottom-0 before:h-full before:w-[51%] before:origin-left  before:bg-blue before:-z-10
                before:scale-x-0 before:transition-transform before:duration-500
                after:absolute after:right-0 after:bottom-0 after:h-full after:w-[50%] after:origin-right  after:bg-blue after:-z-10
                after:scale-x-0 after:transition-transform after:duration-500
                hover:text-black hover:before:scale-x-[100%] hover:after:scale-x-[100%] 
                '>
					Sign in with Google
				</button>
				{errors?.message && <p className='text-center mt-2'>{errors.message}</p>}
			</div>
		</div>
	);
};

export default LoginPage;
