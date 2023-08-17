import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';

import { CommentPostType, FetchedPostType, PostType } from '../../models/interfaces';
import { database } from '../../firebase/firebaseConfig';
import { createPortal } from 'react-dom';

interface ProfileModalPropsType {
	profileData: PostType | FetchedPostType | CommentPostType;
}

const ProfileModal = ({ profileData }: ProfileModalPropsType): JSX.Element => {
	const [description, setDescription] = useState<string>('');
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState<null | string>(null);

	useEffect(() => {
		setIsLoading(true);
		setIsError(null);
		const fetchDescription = async () => {
			try {
				const databaseRef = ref(database, `/users/${profileData.userId}/description`);
				const result = (await get(databaseRef)).val() as string;
				setDescription(result);
			} catch (error) {
				console.log(error);
				setIsError('Download description failed!');
			}

			setIsLoading(false);
		};
		void fetchDescription();
	}, [profileData.userId]);

	return createPortal(
		<div className='  dark:bg-gray-dark bg-gray-extraLight  dark:text-white text-black   rounded-2xl overflow-hidden  w-full '>
			{!isLoading && (
				<>
					<div className='relative  '>
						<img src={profileData.photoURL} className='  w-full  object-cover max-h-[200px]' />
						<div className='absolute top-0 right-0 w-full h-full bg-black bg-opacity-40'></div>
					</div>
					<div className='p-4'>
						<p className='font-bold text-lg mb-2'>{profileData.identyfier}</p>
						<p className='text-gray-light mb-2'>{profileData.name}</p>
						{isError && <p>{isError}</p>}
						{!isError && <p className='break-all'>{description}</p>}
					</div>
				</>
			)}
		</div>,
		document.getElementById('profileModal')!
	);
};

export default ProfileModal;
