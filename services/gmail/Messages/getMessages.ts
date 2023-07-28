import { gmail_v1 } from "googleapis";
import getMessage from "./getMessage";

export default async function getMessages(gmail: gmail_v1.Gmail) {
	const messagesOnlyId = await getMessagesOnlyIds(gmail);
	if (!messagesOnlyId.messages || !messagesOnlyId.messages.length) return false;

	const actualMessages: gmail_v1.Schema$Message[] = [];

	for (let i = 0; i < messagesOnlyId.messages?.length; i++) {
		const message = messagesOnlyId.messages[i];
		if (!message.id) return;

		const actualMessage = await getMessage(gmail, message.id);
		actualMessages.push(actualMessage);
	}

	return actualMessages;
}

export async function getMessagesOnlyIds(
	gmail: gmail_v1.Gmail,
	maxResults: number = 20
) {
	const messages = await gmail.users.messages.list({
		userId: "me",
		maxResults: maxResults,
		q: "in:inbox category:primary",
	});

	return messages.data;
}
