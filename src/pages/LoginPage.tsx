/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { AppDispatchType, RootStateType } from '../store/store.ts';
import { userActions } from '../store/user-slice.ts';
import { auth, provider } from '../firebase/firebaseConfig.ts';
import twitterLogo from '../assets/twitterLogoBig.png';
import { TokenType } from '../models/interfaces.ts';
import { addTokenToLocalStorage } from '../firebase/authHelpers.ts';

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatchType = useDispatch();
	//test
	const token = useSelector((state: RootStateType) => state.user.userToken);
	console.log(token);

	const loginHandler = (): void => {
		signInWithPopup(auth, provider)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((result: any) => {
				const user: TokenType = {
					name: result.user.displayName,
					email: result.user.email,
					photoURL: result.user.photoURL,
					userId: result.user.uid,
					expirationTime: result.user.stsTokenManager.expirationTime,
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
		<div className='w-full h-screen flex justify-center items-center'>
			<div className=' p-6 text-center rounded-md max-w-[400px] dark:text-white text-black'>
				<img src={twitterLogo} className='w-full' />
				<h2 className='text-2xl font-bold my-4'>Join Twitted today.</h2>
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
			</div>
		</div>
	);
};

export default LoginPage;
