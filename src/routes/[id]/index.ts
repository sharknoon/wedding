import { getDetails, getInvitation, updateInvitation } from "$lib/database";

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
  const invitationId: string = params.id;

  if (!invitationId) {
    return {
      status: 400,
      body: { message: "Missing invitation id" },
    };
  }

  const invitation = await getInvitation(invitationId);
  const details = await getDetails();

  return {
    body: { "invitation": invitation, "details": details },
  };
}

/** @type {import('./[id]').RequestHandler} */
export async function put({ params, request }) {
  const invitationId: string = params.id;

  if (!invitationId) {
    return {
      status: 400,
      body: { message: "Missing invitation id" },
    };
  }

  const result = await updateInvitation(
    invitationId,
    await request.json(),
  );

  if (result.matchedCount != 1) {
    return {
      status: 404,
      body: { message: "Invitation not found" },
    };
  }
  return {
    status: 200,
    body: { message: "Ok" },
  };
}
