import {
	type Collection,
	type Db,
	type DeleteResult,
	type Document,
	type InsertOneResult,
	MongoClient,
	type UpdateResult,
	type WithId,
	ChangeStream,
	ObjectId
} from 'mongodb';
import type { Details, Invitation } from '$lib/types';
import { env } from '$env/dynamic/private';

const client = new MongoClient(env.MONGODB_URL, {
	pkFactory: { createPk: () => new ObjectId().toString() }
});

let db: Db;
let invitations: Collection<Invitation>;
let details: Collection<Details>;

async function setup() {
	if (db) return;
	await client.connect();
	db = client.db('wedding');
	await db.command({ ping: 1 });
	console.info('Connected to MongoDB');
	invitations = db.collection('invitations');
	invitations.createIndex({ slug: 1 }, { unique: true });
	details = db.collection('details');
}

export async function getInvitationByPath(slug: string): Promise<WithId<Invitation> | null> {
	await setup();
	return invitations.findOne({ slug: slug });
}

export async function getDetails(): Promise<WithId<Details> | null> {
	await setup();
	return details.findOne();
}

export async function updateInvitation(
	id: string,
	invitation: Invitation
): Promise<Document | UpdateResult> {
	await setup();
	return invitations.replaceOne({ _id: id }, invitation);
}

export async function getAllInvitations(): Promise<WithId<Invitation>[]> {
	await setup();
	return invitations.find().toArray();
}

export async function streamAllInvitations(): Promise<ChangeStream<Invitation>> {
	await setup();
	return invitations.watch(undefined, {
		fullDocument: 'updateLookup'
	});
}

export async function deleteInvitation(id: string): Promise<DeleteResult> {
	await setup();
	return invitations.deleteOne({ _id: id });
}

export async function createInvitation(
	invitation: Invitation
): Promise<InsertOneResult<Invitation>> {
	await setup();
	return invitations.insertOne(invitation);
}
