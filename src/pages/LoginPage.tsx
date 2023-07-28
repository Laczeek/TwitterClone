import twitterLogo from '../assets/twitterLogoBig.png';

const LoginPage = (): JSX.Element => {
	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<div className='bg-white p-6 text-center rounded-md max-w-[400px]'>
				<img src={twitterLogo} className='w-full' />
				<h2 className='text-2xl font-bold my-4'>Join Twitted today.</h2>
				<button
					className='relative rounded-xl overflow-hidden z-10  bg-black text-white py-2 px-4  border-blue
                transition-colors duration-500
                before:absolute before:left-0 before:bottom-0 before:h-full before:w-[51%] before:origin-left  before:bg-blue before:-z-10
                before:scale-x-0 before:transition-transform before:duration-500
                after:absolute after:right-0 after:bottom-0 after:h-full after:w-[50%] after:origin-right  after:bg-blue after:-z-10
                after:scale-x-0 after:transition-transform after:duration-500
                hover:text-black hover:before:scale-x-[100%] hover:after:scale-x-[100%] 
                '>
					Sign in with Google
				</button>
			</div>
		</div>
	);
};

export default LoginPage;
