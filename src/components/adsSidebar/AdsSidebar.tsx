import SearchBar from './SearchBar';
import NewsContainer from './NewsContainer';
import FollowContainer from './FollowContainer';
const AdsSidebar = (): JSX.Element => {
	return (
		<div className=' hidden sticky  p-2  top-0 right-0 max-w-[300px] h-auto  md:flex md:flex-col md:gap-y-6   '>
			<SearchBar />
			<NewsContainer />
			<FollowContainer />
		</div>
	);
};

export default AdsSidebar;
