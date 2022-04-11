import {
  type Collection,
  type Db,
  MongoClient,
  type UpdateResult,
} from "mongodb";
import { MONGODB_URL } from "$lib/env";
import type { Details, Invitation, Member } from "src/types";

const client = new MongoClient(MONGODB_URL);

const dbName = "wedding";

let db: Db;
let invitations: Collection<Invitation>;
let details: Collection<Details>;

async function setup() {
  if (db && (await db.command({ ping: 1 }))) return;
  await client.connect();
  console.log("Connected to MongoDB");
  db = client.db(dbName);
  invitations = db.collection("invitations");
  details = db.collection("details");
}

export async function getInvitations(
  id: string,
): Promise<Invitation> {
  await setup();
  return invitations.findOne({ _id: id });
}

export async function getDetails(): Promise<Details> {
  await setup();
  return details.findOne();
}

export async function updateInvitationMembers(
  id: string,
  members: Member[],
): Promise<UpdateResult> {
  await setup();
  return invitations.updateOne({ _id: id }, { $set: { members } });
}
