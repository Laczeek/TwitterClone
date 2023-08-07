import { Form } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Modal from '../ui/Modal';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { RootStateType } from '../../store/store';

interface LogoutModalPropsType {
	closeModal: () => void;
}

const LogoutModal = ({ closeModal }: LogoutModalPropsType): JSX.Element => {
	const userData = useSelector((state: RootStateType) => state.user.userToken);

	return (
		<Modal closeModal={closeModal}>
			<div
				className={`absolute top-[50%]  translate-y-[-50%] dark:bg-black bg-white  drop-shadow-[0_0_3px_#ffffffd6] rounded-2xl overflow-hidden `}
				onClick={event => event.stopPropagation()}>
				<div>
					<div className='flex justify-between items-center border-b border-gray-border p-4'>
						<img src={userData?.photoURL} className='h-11 w-11 rounded-full' />
						<CheckBadgeIcon className='text-blue w-6 h-6' />
					</div>

					<Form method='post' action='/logout'>
						<button className='p-4 dark:text-white text-black linkHoverAnimation'>
							Log out {userData?.identyfier}
						</button>
					</Form>
				</div>
			</div>
		</Modal>
	);
};

export default LogoutModal;
