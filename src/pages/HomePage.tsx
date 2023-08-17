import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { off, onValue, ref } from 'firebase/database';

import { AppDispatchType, RootStateType } from '../store/store';
import { database } from '../firebase/firebaseConfig';
import Title from '../components/ui/Title';
import AddPost from '../components/postsArea/AddPost';
import Post from '../components/postsArea/Post';
import { FetchedPostType } from '../models/interfaces';
import loadingSpinner from '../assets/spinnerLoader.svg';
import { uiActions } from '../store/ui-slice';

const HomePage = (): JSX.Element => {
	const userData = useSelector((state: RootStateType) => state.user.userToken);
	const posts = useSelector((state:RootStateType) => state.ui.posts);
	const dispatch:AppDispatchType = useDispatch();
	
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState<null | string>(null);

	useEffect(() => {
		const postsRef = ref(database, 'posts/');
		const listener = onValue(postsRef, snapshot => {
			try {
				setIsLoading(true);
				setIsError(null);
				const data = snapshot.val() as object;
				if (data) {
					const posts = [];

					for (const [key, value] of Object.entries(data)) {
						const post = { id: key, ...value } as FetchedPostType;
						posts.push(post);
					}
					const sortedPosts = posts.sort((a, b) => b.whenAdded - a.whenAdded);

					dispatch(uiActions.setPosts(sortedPosts))
				} else {
					setIsError('Failed to download posts!');
				}
			} catch (error) {
				console.log(error);
				setIsError('Failed to download posts!');
			}
			setIsLoading(false);
		});

		return () => off(postsRef, 'value', listener);
	}, [dispatch]);

	return (
		<>
			<Title title='Home' isArrowNeeded={false} />
			<AddPost userData={userData!} />
			{!isLoading &&
				!isError &&
				posts.map(post => (
					<Link to={post.id} key={post.id}>
						<Post post={post} userData={userData!} />
					</Link>
				))}

			{isLoading && !isError && (
				<div className='flex justify-center items-center mt-10'>
					<img src={loadingSpinner} className='animate-spin' />
				</div>
			)}
			{!isLoading && isError && (
				<p className='text-2xl text-center mt-5 font-bold dark:text-white text-black'>{isError}</p>
			)}
		</>
	);
};

export default HomePage;
