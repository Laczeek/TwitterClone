import Modal from '../ui/Modal';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import avatar from '../../assets/avatarImg.png';

interface LogoutModalPropsType {
	closeModal: () => void;
}

const LogoutModal = ({closeModal}: LogoutModalPropsType): JSX.Element => {
	return (
		<Modal closeModal={closeModal}>
			<div>
				<div className='flex justify-between items-center border-b border-gray-border p-4'>
					<img src={avatar} className='h-11 w-11' />
					<CheckBadgeIcon className='text-blue w-6 h-6' />
				</div>
				<div className='dark:text-white text-black'>
					<a href='#' className='block linkHoverAnimation p-4 '>
						Log out @patrykpopiela
					</a>
				</div>
			</div>
		</Modal>
	);
};

export default LogoutModal;
