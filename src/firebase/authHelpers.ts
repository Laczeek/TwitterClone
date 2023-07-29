import { redirect } from 'react-router-dom';
import { TokenType } from '../models/interfaces';

export const addTokenToLocalStorage = (tokenData: TokenType) => {
	localStorage.setItem('token', JSON.stringify(tokenData));
};

export const getTokenFromLocalStorage = () => {
	const token = localStorage.getItem('token');

	if (typeof token === 'string') {
		return JSON.parse(token) as TokenType;
	}

	return null;
};

export const loader = () => {
	const token = getTokenFromLocalStorage();
	if (!token) {
		return redirect('/');
	}
	return null;
};
