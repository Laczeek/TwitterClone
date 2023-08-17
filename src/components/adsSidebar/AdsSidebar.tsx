import SearchBar from './SearchBar';
import FollowContainer from './FollowContainer';

const AdsSidebar = (): JSX.Element => {
	return (
		<div className=' hidden sticky  p-2  top-0 right-0 w-[300px]  md:flex md:flex-col md:gap-y-6   '>
			<SearchBar />

			<FollowContainer />
			<div id='profileModal'></div>
		</div>
	);
};

export default AdsSidebar;
