import { gmail_v1 } from "googleapis";

export default async function getThread(
	gmail: gmail_v1.Gmail,
	threadId: string
) {
	const thread = await gmail.users.threads.get({
		userId: "me",
		id: threadId,
	});

	return thread.data;
}
