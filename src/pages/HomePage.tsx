import { useEffect, useState } from 'react';
import { off, onValue, ref } from 'firebase/database';

import { database } from '../firebase/firebaseConfig';
import Title from '../components/ui/Title';
import AddPostForm from '../components/postsArea/AddPostForm';
import Post from '../components/postsArea/Post';
import { FetchedPostType, PostType } from '../models/interfaces';
import loadingSpinner from '../assets/spinnerLoader.svg';

const HomePage = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState<FetchedPostType[] | []>([]);

	useEffect(() => {
		const postsRef = ref(database, 'posts/');
		const listener = onValue(postsRef, snapshot => {
			try {
				setIsLoading(true);
				const data = snapshot.val() as PostType[];
				if (data) {
					const posts = [];
					for (const [key, value] of Object.entries(data)) {
						const post = { id: key, ...value };
						posts.push(post);
					}
					const sortedPosts = posts.sort((a, b) => b.whenAdded - a.whenAdded);

					setPosts(sortedPosts);
				}
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		});
		return () => off(postsRef, 'value', listener);
	}, []);

	return (
		<>
			<Title />
			<AddPostForm />
			{!isLoading && posts.map(post => <Post key={post.id} {...post} />)}

			{isLoading && (
				<div className='flex justify-center items-center mt-10'>
					<img src={loadingSpinner} className='animate-spin' />
				</div>
			)}
		</>
	);
};

export default HomePage;
