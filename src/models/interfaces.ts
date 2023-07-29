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
	accessToken: string;
	name: string;
	email: string;
	photoURL: string;
	userId: string;
	expirationTime: number;
}