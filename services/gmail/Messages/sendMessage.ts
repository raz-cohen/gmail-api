import { gmail_v1 } from "googleapis";

export interface IMessage {
	to: string;
	subject: string;
	text: string;
}

export default async function sendMessage(
	gmail: gmail_v1.Gmail,
	data: IMessage
) {
	const bodyAsBase64 = Buffer.from(BuildMessage(data)).toString("base64");
	const message: gmail_v1.Params$Resource$Users$Messages$Send = {
		userId: "me",
		requestBody: {
			raw: bodyAsBase64,
		},
	};

	const response = await gmail.users.messages.send(message);
	return response;
}

function BuildMessage(message: IMessage) {
	const rawMessage = `
To: <${message.to}>
Subject: ${message.subject} 

${message.text}
    `.trim();

	return rawMessage;
}
