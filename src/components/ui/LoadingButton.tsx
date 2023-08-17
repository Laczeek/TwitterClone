import { useSelector } from 'react-redux';

import smallSpinner from '../../assets/smallSpinner.svg';
import { RootStateType } from '../../store/store';

interface LoadingButtonPropsType {
	text: string;
	loadingText: string;
	isDisabled: boolean;
	onClick: (() => void) | undefined;
}

const LoadingButton = ({ text, loadingText, onClick, isDisabled }: LoadingButtonPropsType): JSX.Element => {
	const isLoading = useSelector((state: RootStateType) => state.ui.btnLoadingState);

	return (
		<button className='btn mt-1' disabled={isLoading || !isDisabled} onClick={onClick}>
			<div className='flex items-center  gap-x-1'>
				{!isLoading ? (
					text
				) : (
					<>
						<p>{loadingText}...</p>
						<img src={smallSpinner} />{' '}
					</>
				)}
			</div>
		</button>
	);
}

export default LoadingButton;
