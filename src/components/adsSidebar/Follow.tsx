import { FollowType } from '../../models/interfaces';

const Follow = ({ name, nick, image }: FollowType): JSX.Element => {
	return (
		<a href='#' className='block linkHoverAnimation px-3 py-2 mb-2'>
			<div className='flex justify-between items-center'>
				<div className='flex gap-x-4'>
					<img className='block h-12 w-12 rounded-full object-cover' src={image} />
					<div>
						<p className='font-bold'>{name}</p>
						<p className='text-sm text-gray-light'>{nick}</p>
					</div>
				</div>
				<button className=' bg-white text-black px-4 py-1 font-bold rounded-2xl'>Follow</button>
			</div>
		</a>
	);
};

export default Follow;
