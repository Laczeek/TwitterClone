import twitterIcon from '../../assets/twitterIconn.png';

const SidebarLogo = (): JSX.Element => {
	return (
		<a className=' w-`14 h-14 flex justify-center items-center' href='#'>
			<img src={twitterIcon} className='w-[50px]' />
		</a>
	);
};

export default SidebarLogo;
