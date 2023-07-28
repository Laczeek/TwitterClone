import { useState } from 'react';

const useModal = (): [boolean, () => void] => {
	const [isShowingModal, setIsShowingModal] = useState(false);

	const toggleModalHandler = () => {
		setIsShowingModal(prevState => !prevState);
	};

	return [isShowingModal, toggleModalHandler];
};

export default useModal;
