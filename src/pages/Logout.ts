import { signOut } from 'firebase/auth';
import { redirect } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';


export const action = async () => {
	await signOut(auth);
	localStorage.removeItem('token');
	return redirect('/');
};
