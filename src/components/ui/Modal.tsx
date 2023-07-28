import { createPortal } from 'react-dom';

interface ModalTypeProps {
	children: React.ReactNode;
	closeModal: () => void;
}

const Modal = ({ children, closeModal }: ModalTypeProps): JSX.Element => {
	return createPortal(
		<div
			className='fixed w-full h-full flex justify-center items-center z-40 bg-gray-dark bg-opacity-80'
			onClick={closeModal}>
			<div
				className='dark:bg-black bg-white  drop-shadow-[0_0_3px_#ffffffd6] rounded-xl overflow-hidden '
				onClick={event => event.stopPropagation()}>
				{children}
			</div>
		</div>,
		document.getElementById('modal-root')!
	);
};

export default Modal;
