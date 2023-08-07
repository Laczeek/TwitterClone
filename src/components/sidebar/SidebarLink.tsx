import { Link } from 'react-router-dom';

interface SideButtonType {
	link: {
		text: string;
		icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
		href: string;
	};
	closeNav: () => void;
}

const SidebarLink = ({ link, closeNav }: SideButtonType): JSX.Element => {
	return (
		<Link
			className='flex items-center  rounded-full my-2 p-3 linkHoverAnimation dark:text-white text-dark  md:text-xl'
			to={link.href}
			onClick={closeNav}>
			<link.icon className='dark:text-white text-black  h-7' />
			<span className='inline sm:hidden  xl:inline ml-4'>{link.text}</span>
		</Link>
	);
};

export default SidebarLink;
