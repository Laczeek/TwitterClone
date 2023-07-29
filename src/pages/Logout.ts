import { signOut } from 'firebase/auth';
import { redirect } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { userActions } from '../store/user-slice';
import store from '../store/store';

export const action = async () => {
	store.dispatch(userActions.logout());
	localStorage.removeItem('token');
	await signOut(auth);
	return redirect('/');
};
