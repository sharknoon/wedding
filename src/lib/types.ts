export type Invitation = {
	_id: string;
	salutation: string;
	members: Member[];
};

export type Member = {
	name: string;
	accepted: string;
};

export type Details = {
	date: string;
	locationName: string;
	street: string;
	city: string;
	text: string[];
	deadline: string;
	program: ProgramItem[];
	faqs: FAQ[];
};

export type ProgramItem = {
	time: string;
	title: string;
	background: string;
	description: string[];
};

export type FAQ = {
	question: string;
	answer: string[];
};

export type CountdownItem = {
	unit: string;
	value: number;
};

export enum SendStatus {
	NONE,
	PENDING,
	SUCCESS,
	ERROR
}

export type EnvironmentVariables = {
	MONGODB_URL: string;
	GOOGLE_MAPS_API_KEY: string;
};
