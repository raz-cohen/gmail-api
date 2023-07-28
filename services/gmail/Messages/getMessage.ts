import { gmail_v1 } from "googleapis";

export default async function getMessage(
	gmail: gmail_v1.Gmail,
	messageId: string
) {
	const message = await gmail.users.messages.get({
		userId: "me",
		id: messageId,
	});

	return message.data;
}
