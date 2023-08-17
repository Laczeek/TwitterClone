import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { off, onValue, ref } from 'firebase/database';

import { database } from '../firebase/firebaseConfig';
import { FetchedPostType } from '../models/interfaces';
import { AppDispatchType, RootStateType } from '../store/store';
import Title from '../components/ui/Title';
import loadingSpinner from '../assets/spinnerLoader.svg';
import Post from '../components/postsArea/Post';
import useTitle from '../hooks/useTitle';
import { uiActions } from '../store/ui-slice';

const MostLikedPage = (): JSX.Element => {
	const userData = useSelector((state: RootStateType) => state.user.userToken);
	
	const posts = useSelector((state:RootStateType) => state.ui.posts);
	const dispatch:AppDispatchType = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState<string | null>(null);

	useTitle('Most liked')

	useEffect(() => {
		const postsRef = ref(database, '/posts');
		const listener = onValue(postsRef, snapshot => {
			try {
				setIsLoading(true);
				setIsError(null);
				const data = snapshot.val() as object;
				if (data) {
					const posts: FetchedPostType[] = [];
					for (const [key, value] of Object.entries(data)) {
						const post = { id: key, ...value } as FetchedPostType;
						if (post.likes) {
							posts.push(post);
						}
					}

					const sortedPosts = posts.sort((a, b) => {
						const aLikes = Object.keys(a.likes).length;
						const bLikes = Object.keys(b.likes).length;
						return bLikes - aLikes;
					});
					dispatch(uiActions.setPosts(sortedPosts))
				} else {
					setIsError('Failed to download most liked posts!');
				}
			} catch (error) {
				console.log(error);
				setIsError('Failed to download most liked posts!');
			}
			setIsLoading(false);
		});

		return () => off(postsRef, 'value', listener);
	}, [dispatch]);

	return (
		<>
			<Title title='Most liked' isArrowNeeded={true} />

			{!isLoading &&
				!isError &&
				posts.map(post => (
					<Link key={post.id} to={`${post.id}`}>
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

export default MostLikedPage;
