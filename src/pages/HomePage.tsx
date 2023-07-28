import Title from '../components/ui/Title';
import AddPostForm from '../components/postsArea/AddPostForm';
import Post from '../components/postsArea/Post';

const HomePage = (): JSX.Element => {
	return (
		<>
			<Title />
			<AddPostForm />
			<Post/>
			<Post/>
		</>
	);
};

export default HomePage;
