import { createPortal } from 'react-dom';

interface ModalTypeProps {
	children: React.ReactNode;
	closeModal: () => void;
}

const Modal = ({ children, closeModal }: ModalTypeProps): JSX.Element => {
	return createPortal(
		<div
			className='fixed flex justify-center  w-full h-full  z-40 bg-gray-dark bg-opacity-80'
			onClick={event => {
				event.preventDefault();
				closeModal();
			}}>
			{children}
		</div>,
		document.getElementById('modal-root')!
	);
};

export default Modal;
