import { Form } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Modal from '../ui/Modal';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { RootStateType } from '../../store/store';

interface LogoutModalPropsType {
	closeModal: () => void;
}

const LogoutModal = ({ closeModal }: LogoutModalPropsType): JSX.Element => {
	const userAvatar = useSelector((state: RootStateType) => state.user.userToken?.photoURL);

	return (
		<Modal closeModal={closeModal}>
			<div>
				<div className='flex justify-between items-center border-b border-gray-border p-4'>
					<img src={userAvatar} className='h-11 w-11 rounded-full' />
					<CheckBadgeIcon className='text-blue w-6 h-6' />
				</div>
				<Form className='block linkHoverAnimation ' action='/logout' method='post'>
					<button type='submit' className='p-4 dark:text-white text-black'>
						Log out @patrykpopiela
					</button>
				</Form>
			</div>
		</Modal>
	);
};

export default LogoutModal;
