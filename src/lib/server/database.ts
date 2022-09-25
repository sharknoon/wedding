import {
	type Collection,
	type Db,
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
import { env } from '$env/dynamic/private';

const client = new MongoClient(env.MONGODB_URL, {
	pkFactory: { createPk: () => new ObjectId().toString() }
});

let db: Db;
let invitationsCollection: Collection<Invitation>;
let detailsCollection: Collection<Details>;

async function setup() {
	if (db) return;
	await client.connect();
	db = client.db('wedding');
	await db.command({ ping: 1 });
	console.info('Connected to MongoDB');
	invitationsCollection = db.collection('invitations');
	invitationsCollection.createIndex({ slug: 1 }, { unique: true });
	detailsCollection = db.collection('details');
}

export async function getInvitationByPath(slug: string): Promise<WithId<Invitation> | null> {
	await setup();
	return invitationsCollection.findOne({ slug: slug });
}

export async function getDetails(): Promise<WithId<Details> | null> {
	await setup();
	return detailsCollection.findOne();
}

export async function setDetails(details: Details) {
	await setup();
	detailsCollection.insertOne(details);
}

export async function updateInvitation(
	id: string,
	invitation: Invitation
): Promise<Document | UpdateResult> {
	await setup();
	return invitationsCollection.replaceOne({ _id: id }, invitation);
}

export async function getAllInvitations(): Promise<WithId<Invitation>[]> {
	await setup();
	return invitationsCollection.find().toArray();
}

export async function streamAllInvitations(): Promise<ChangeStream<Invitation>> {
	await setup();
	return invitationsCollection.watch(undefined, {
		fullDocument: 'updateLookup'
	});
}

export async function deleteInvitation(id: string): Promise<DeleteResult> {
	await setup();
	return invitationsCollection.deleteOne({ _id: id });
}

export async function createInvitation(
	invitation: Invitation
): Promise<InsertOneResult<Invitation>> {
	await setup();
	return invitationsCollection.insertOne(invitation);
}
