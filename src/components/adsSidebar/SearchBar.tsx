import { MagnifyingGlassIcon, AtSymbolIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatchType } from '../../store/store';
import { uiActions } from '../../store/ui-slice';

const SearchBar = (): JSX.Element => {
	const location = useLocation();
	const dispatch: AppDispatchType = useDispatch();
	const [phrase, setPhrase] = useState('');

	const isCorrectLocation = location.pathname === '/home' || location.pathname === '/home/most-liked';

	useEffect(() => {
		dispatch(uiActions.filterPosts(phrase));
	}, [phrase, dispatch]);

	return (
		<form
			className={`flex items-center dark:bg-gray-dark bg-gray-extraLight rounded-full  px-3 py-2 border-2 border-transparent focus-within:border-blue ${
				!isCorrectLocation ? 'invisible' : 'visible'
			}`}>
			<MagnifyingGlassIcon className='h-5 w-5 text-gray-light' />
			<AtSymbolIcon className='ml-2 h-5 w-5 text-black' />
			<input
				placeholder='Search by identyfier...'
				value={phrase}
				onChange={event => setPhrase(event.target.value)}
				type='text'
				className=' dark:text-white text-black bg-transparent px-1 outline-none'
			/>
		</form>
	);
};

export default SearchBar;
