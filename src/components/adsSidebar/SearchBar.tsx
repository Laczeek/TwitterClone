import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = (): JSX.Element => {
	return (
		<form className='flex items-center dark:bg-gray-dark bg-gray-extraLight rounded-full  px-3 py-2 border-2 border-transparent focus-within:border-blue '>
			<MagnifyingGlassIcon className='h-5 w-5 text-gray-light' />
			<input
				placeholder='Search...'
				type='text'
				className=' dark:text-white text-black bg-transparent px-1 outline-none'
			/>
		</form>
	);
};

export default SearchBar;
