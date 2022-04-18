import {
  createInvitation,
  deleteInvitation,
  getAllInvitations,
} from "$lib/database";

/** @type {import('./index').RequestHandler} */
export async function get() {
  const invitations = await getAllInvitations();

  return {
    body: { "invitations": invitations },
  };
}

/** @type {import('./index').RequestHandler} */
export async function del({ url }) {
  const invitationId: string = url.searchParams.get("id");

  if (!invitationId) {
    return {
      status: 400,
      body: { message: "Missing invitation id" },
    };
  }

  const result = await deleteInvitation(invitationId);

  if (result.deletedCount !== 1) {
    return {
      status: 400,
      body: { message: "Could not delete invitation " + invitationId },
    };
  }

  return {
    status: 200,
  };
}

export async function put({ request }) {
  try {
    const result = await createInvitation(
      await request.json(),
    );
    if (!result.insertedId) {
      return {
        status: 500,
        body: { message: "Invitation could not be saved" },
      };
    }
    return {
      status: 200,
      body: { message: "Ok" },
    };
  } catch (error) {
    return {
      status: 500
    };
  }
}
