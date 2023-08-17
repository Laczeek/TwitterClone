import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../store/store';
import { useParams } from 'react-router-dom';
import { ref, onValue, off } from 'firebase/database';

import { database } from '../firebase/firebaseConfig';
import { CommentPostType, FetchedPostType, PostType } from '../models/interfaces';
import Title from '../components/ui/Title';
import Post from '../components/postsArea/Post';
import loadingSpinner from '../assets/spinnerLoader.svg';
import Comment from '../components/postsArea/Comment';
import useTitle from '../hooks/useTitle';

const PostPage = (): JSX.Element => {
	const userData = useSelector((state: RootStateType) => state.user.userToken);

	const { id } = useParams();
	
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState<null | string>(null);
	const [post, setPost] = useState<PostType | null>(null);

	useTitle(post?.name && 'Post-' + post.name );

	useEffect(() => {
		const postRef = ref(database, `posts/${id!}`);
		const listener = onValue(postRef, snapshot => {
			setIsLoading(true);
			setIsError(null);
			try {
				const data = snapshot.val() as FetchedPostType;
				// convert comments to array !!!
				if (data) {
					data.id = id!;
					if (data.comments) {
						const comments: CommentPostType[] = [];

						for (const [key, value] of Object.entries(data.comments)) {
							const comment = { id: key, ...value } as CommentPostType;
							comments.push(comment);
						}
						data.comments = comments.sort((a, b) => b.whenAdded - a.whenAdded);
					}

					setPost(data as PostType);
				} else {
					setIsError("Couldn't download post!");
				}
			} catch (error) {
				console.log(error);
				setIsError("Couldn't download post!");
			}
			setIsLoading(false);
		});
		return () => off(postRef, 'value', listener);
	}, [id]);

	return (
		<>
			<Title title='Tweet / Comments' isArrowNeeded={true} />
			{isLoading && !isError && (
				<div className='flex justify-center items-center mt-10'>
					<img src={loadingSpinner} className='animate-spin' />
				</div>
			)}

			{!isLoading && !isError && (
				<div>
					<Post post={post!} userData={userData!} />
					{post?.comments &&
						post.comments.map(comment => (
							<Comment key={comment.id} comment={comment} post={post} userId={userData!.userId} />
						))}
				</div>
			)}
			{!isLoading && isError && (
				<p className='text-2xl text-center mt-5 font-bold dark:text-white text-black'>{isError}</p>
			)}
		</>
	);
};

export default PostPage;
