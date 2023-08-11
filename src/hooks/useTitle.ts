import { useEffect } from 'react';

const useTitle = (title: string | undefined) => {
	useEffect(() => {
		const defaultTitle = document.title;
		if (title) {
			document.title = title;
		}
		return () => {
			document.title = defaultTitle;
		};
	}, [title]);
};

export default useTitle;
