import { Link } from 'react-router-dom';
import twitterIcon from '../../assets/twitterIconn.png';

const SidebarLogo = (): JSX.Element => {
	return (
		<Link className=' w-`14 h-14 flex justify-center items-center' to='/home'>
			<img src={twitterIcon} className='w-[50px]' />
		</Link>
	);
};

export default SidebarLogo;
