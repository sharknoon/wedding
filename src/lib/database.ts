import {
	type Collection,
	type Db,
	type DeleteResult,
	type InsertOneResult,
	MongoClient,
	type UpdateResult,
	type WithId,
	ChangeStream
} from 'mongodb';
import type { Details, Invitation } from '$lib/types';
import { MONGODB_URL } from './env';

const client = new MongoClient(MONGODB_URL);

let db: Db;
let invitations: Collection<Invitation>;
let details: Collection<Details>;

async function setup() {
	if (db && (await db.command({ ping: 1 }))) return;
	await client.connect();
	console.log('Connected to MongoDB');
	db = client.db('wedding');
	invitations = db.collection('invitations');
	details = db.collection('details');
}

export async function getInvitation(id: string): Promise<WithId<Invitation> | null> {
	await setup();
	return invitations.findOne({ _id: id });
}

export async function getDetails(): Promise<WithId<Details> | null> {
	await setup();
	return details.findOne();
}

export async function updateInvitation(id: string, invitation: Invitation): Promise<UpdateResult> {
	await setup();
	const members = invitation.members;
	return invitations.updateOne(
		{ _id: id },
		{
			$set: { members }
		}
	);
}

export async function getAllInvitations(): Promise<WithId<Invitation>[]> {
	await setup();
	return invitations.find().toArray();
}

export async function streamAllInvitations(): Promise<ChangeStream<Invitation>> {
	await setup();
	return invitations.watch(undefined, {
		fullDocument: 'updateLookup',
		fullDocumentBeforeChange: 'whenAvailable'
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
