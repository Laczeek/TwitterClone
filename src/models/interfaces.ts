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
	identyfier: string;
}
export interface CommentPostType {
	id: string;
	name: string;
	identyfier: string;
	commentFileUrl?:string;
	photoURL: string;
	userId: string;
	message: string;
	likes: object;
	whenAdded: number;
}

export interface PostType {
	name: string;
	identyfier: string;
	photoURL: string;
	uid: string;
	whenAdded: number;
	postFileUrl?: string;
	comments: CommentPostType[];
	likes: object;
	message: string;
	id: string;
}

export interface FetchedPostType {
	name: string;
	identyfier: string;
	photoURL: string;
	uid: string;
	whenAdded: number;
	postFileUrl?: string;
	id: string;
	comments: object;
	likes: object;
	message: string;
}

