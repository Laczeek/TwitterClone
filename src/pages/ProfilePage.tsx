import { useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';

import Title from '../components/ui/Title';
import { database } from '../firebase/firebaseConfig';
import { UserData } from '../models/interfaces';

import loadingSpinner from '../assets/spinnerLoader.svg';
import useTitle from '../hooks/useTitle';

const ProfilePage = (): JSX.Element => {
	const { id } = useParams();

	const [userData, setUserData] = useState<UserData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState<null | string>(null);

	useTitle(userData?.name)

	useEffect(() => {
		setIsLoading(true);
		const fetchUserData = async () => {
			setIsError(null);
			try {
				const databaseRef = ref(database, `/users/${id!}`);
				const result = (await get(databaseRef)).val() as UserData;
				setUserData(result);
			} catch (error) {
				console.log(error);
				setIsError('Download user data failed!');
			}
			setIsLoading(false);
		};
		void fetchUserData();
	}, [id]);

	return (
		<>
			{isLoading && !isError && (
				<div className='flex justify-center items-center mt-10'>
					<img src={loadingSpinner} className='animate-spin' />
				</div>
			)}
			{!isLoading && !isError && (
				<>
					<Title title={userData!.name} isArrowNeeded={false} />
					<div className='mt-10 px-2 flex flex-col justify-center items-center'>
						<img src={userData?.photoURL} className='w-[150px] h-[150px] rounded-full object-cover' />

						<div className='mt-10'>
							<div className='mb-2'>
								<p className='text-gray-light'>Identyfier:</p>
								<p className='font-bold text-lg dark:text-white'>{userData?.identyfier}</p>
							</div>
							<div className='mb-2'>
								<p className='text-gray-light'>Email adress:</p>
								<p className='font-bold text-lg dark:text-white'>{userData?.email}</p>
							</div>
							<div>
								<p className='text-gray-light'>Description:</p>
								<p className='dark:text-white'>{userData?.description}</p>
							</div>
						</div>
					</div>
				</>
			)}

			{!isLoading && isError && <p>{isError}</p>}
		</>
	);
};

export default ProfilePage;
