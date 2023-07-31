import { Link } from 'react-router-dom';

interface SideButtonType {
	text: string;
	Icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
	closeNav: () => void;
}

const SidebarLink = ({ text, Icon, closeNav }: SideButtonType): JSX.Element => {
	return (
		<Link
			className='flex items-center  rounded-full my-2 p-3 linkHoverAnimation dark:text-white text-dark  md:text-xl'
			to='/home'
			onClick={closeNav}>
			<Icon className='dark:text-white text-black  h-7' />
			<span className='inline sm:hidden  xl:inline ml-4'>{text}</span>
		</Link>
	);
};

export default SidebarLink;
