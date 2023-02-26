import { env } from '$env/dynamic/private';
import { building } from '$app/environment';
import {
	type Collection,
	type DeleteResult,
	type Document,
	type InsertOneResult,
	MongoClient,
	type UpdateResult,
	type WithId,
	type ChangeStream,
	ObjectId
} from 'mongodb';
import type { Details, Invitation } from '$lib/types';

let invitationsCollection: Collection<Invitation>;
let detailsCollection: Collection<Details>;

if (!building) {
	if (!env.MONGODB_URL) {
		console.error('Missing MONGODB_URL env');
		process.exit();
	}

	const client = new MongoClient(env.MONGODB_URL, {
		pkFactory: { createPk: () => new ObjectId().toString() }
	});
	await client.connect();
	const db = client.db('wedding');
	await db.command({ ping: 1 });
	console.info('Connected to MongoDB');

	invitationsCollection = db.collection('invitations');
	invitationsCollection.createIndex({ slug: 1 }, { unique: true });
	detailsCollection = db.collection('details');

	if ((await detailsCollection.countDocuments()) === 0) {
		detailsCollection.insertOne({
			date: '2042-01-01T00:00:42.000',
			locationName: 'locationName',
			street: 'street',
			city: 'city',
			text: ['This is some example invitation text.', 'Change me in the database.'],
			deadline: '2042-01-01T00:00:42.000',
			program: [
				{
					time: '2042-01-01T00:00:42.000',
					title: 'Program item no. 1',
					background: 'some-image.jpg',
					description: ['This is a example text for a program item.', 'Change me in the database.']
				}
			],
			faqs: [
				{
					question: 'Example question no. 1',
					answer: ['This is a example answer for a faq item.', 'Change me in the database.']
				}
			],
			privateStreet: 'privateStreet',
			privateCity: 'privateCity',
			milestones: [{ date: '2042-01-01T00:00:42.000', title: 'title', image: 'heart' }]
		} satisfies Details);
		console.info(
			'Database has been freshly initialized. Please fill in the required informations in the details collection in the database.'
		);
	}
}

export async function getInvitationBySlug(slug: string): Promise<WithId<Invitation> | null> {
	return invitationsCollection.findOne({ slug: slug });
}

export async function getDetails(): Promise<WithId<Details> | null> {
	return detailsCollection.findOne();
}

export async function updateInvitation(
	id: string,
	invitation: Invitation
): Promise<Document | UpdateResult> {
	return invitationsCollection.replaceOne({ _id: id }, invitation);
}

export async function getAllInvitations(): Promise<WithId<Invitation>[]> {
	return invitationsCollection.find().sort({ position: 1 }).toArray();
}

export async function streamAllInvitations(): Promise<ChangeStream<Invitation>> {
	return invitationsCollection.watch(undefined, {
		fullDocument: 'updateLookup'
	});
}

export async function deleteInvitation(id: string): Promise<DeleteResult> {
	return invitationsCollection.deleteOne({ _id: id });
}

export async function createInvitation(
	invitation: Invitation
): Promise<InsertOneResult<Invitation>> {
	return invitationsCollection.insertOne(invitation);
}
