import { createPortal } from 'react-dom';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface PickerModalPropsTypes {
	onAddEmoji: (emoji: string) => void;
	hideModal: (event: Event) => void;
}

const PickerModal = ({ onAddEmoji, hideModal }: PickerModalPropsTypes): JSX.Element => {
	return createPortal(
		<div className='fixed z-10 top-[60%] left-[50%]  sm:top-[55%] sm:left-[35%] lg:left-[23%] xl:left-[33%]  translate-x-[-50%] translate-y-[-50%]'>
			<Picker
				data={data}
				perLine={7}
				onEmojiSelect={(event: Event & { native: string }) => onAddEmoji(event.native)}
				onClickOutside={hideModal}
			/>
		</div>,
		document.getElementById('modal-root')!
	);
};

export default PickerModal;
