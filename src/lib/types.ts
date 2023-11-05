export type Invitation = {
	_id?: string;
	slug: string;
	salutation: string;
	members: Member[];
	allergies: string;
	position: number;
	hidden: boolean;
	views: number;
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
	textSingular: string[];
	textPlural: string[];
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

export type Upload = {
	createdAt: string;
	url: string;
	type: string;
	width: number;
	height: number;
	thumbnailUrl: string;
	originalUrl: string;
};
