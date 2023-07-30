interface TweetButtonPropsTypes {
	fontSize: '18px' | '16px';
	width?: string;
	disabled?: boolean;
	isTypeSubmit?: boolean;
}

const TweetButton = (props: TweetButtonPropsTypes): JSX.Element => {
	const scrollToTop = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};

	let fSize;

	if (props.fontSize === '18px') {
		fSize = '1.125rem';
	} else {
		fSize = 'font-size: 0.875rem';
	}

	return (
		<button
			onClick={props.isTypeSubmit ? undefined : scrollToTop}
			className='btn'
			style={{ width: props.width ? props.width : '', fontSize: fSize }}
			disabled={props.disabled ? props.disabled : false}
			type={props.isTypeSubmit ? 'submit' : 'button'}>
			Tweet
		</button>
	);
};

export default TweetButton;
