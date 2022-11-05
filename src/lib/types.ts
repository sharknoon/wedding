export type Invitation = {
	_id?: string;
	slug: string;
	salutation: string;
	members: Member[];
	allergies: string;
};

export type Member = {
	name: string;
	accepted: 'unknown' | 'true' | 'false';
	table: number;
	diet: 'unknown' | 'omnivorian' | 'pescetarian' | 'vegetarian' | 'vegan';
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
	privateStreet: string;
	privateCity: string;
	milestones: Milestone[];
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

export type Milestone = {
	date: string;
	title: string;
	image: string;
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
