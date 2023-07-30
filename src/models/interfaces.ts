export interface NewsType {
	title: string;
	text: string;
	tags: string[];
}

export interface FollowType {
	name: string;
	nick: string;
	image: string;
}

export interface TokenType {
	name: string;
	email: string;
	photoURL: string;
	userId: string;
	expirationTime: number;
}

export interface PostType {
	name: string;
	email: string;
	photoURL: string;
	uid: string;
	whenAdded: number;
	//do zmiany w przyszłości to comments i likes
	comments: [] | string[];
	likes: [] | string[];
	message: string;
}

export interface FetchedPostType extends PostType {
	id: string;
}
