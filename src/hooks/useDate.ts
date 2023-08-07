const MILLISECONDS_IN_MINUTE = 60000;
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_DAY = 86400000;

const useDate = (miliseconds: number) => {
	const currentTime = new Date().getTime();
	const whenAdded = currentTime - miliseconds;

	let howMuchTimeAgo: string;

	if (whenAdded < MILLISECONDS_IN_HOUR) {
		howMuchTimeAgo = Math.ceil(whenAdded / MILLISECONDS_IN_MINUTE).toString() + ' minutes ago';
	} else if (whenAdded < MILLISECONDS_IN_DAY) {
		howMuchTimeAgo = Math.floor(whenAdded / MILLISECONDS_IN_HOUR).toString() + ' hours ago';
	} else {
		howMuchTimeAgo = Math.floor(whenAdded / MILLISECONDS_IN_DAY).toString() + ' days ago';
	}

	return howMuchTimeAgo;
};

export default useDate;
