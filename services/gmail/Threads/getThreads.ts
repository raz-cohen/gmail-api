import { gmail_v1 } from "googleapis";

export default async function getThreads(
	gmail: gmail_v1.Gmail,
	maxResults = 20
) {
	const threads = await gmail.users.threads.list({
		userId: "me",
		q: "in:inbox category:primary",
		maxResults: maxResults,
	});

	return threads.data;
}
