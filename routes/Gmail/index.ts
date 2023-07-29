import express, { Request } from "express";
import { google, gmail_v1 } from "googleapis";
import oauth2Client from "../../services/auth/oauth2Client";
import getThreads from "../../services/gmail/Threads/getThreads";
import getThread from "../../services/gmail/Threads/getThread";
import sendMessage, {
	IMessage,
} from "../../services/gmail/Messages/sendMessage";

const gmailRoute = express.Router();

gmailRoute.use((req, res, next) => {
	const refreshToken = req.headers.authorization;
	if (!refreshToken) return res.status(500).send("Missing refresh token");

	oauth2Client.setCredentials({
		refresh_token: refreshToken,
	});

	const gmail = google.gmail({
		version: "v1",
		auth: oauth2Client,
	});

	req.body.gmail = gmail;

	next();
});

gmailRoute.get("/", async (req, res) => {
	const gmail = req.body.gmail as gmail_v1.Gmail;

	const threads = await getThreads(gmail);

	res.send(threads);
});

gmailRoute.get("/:threadId", async (req, res) => {
	const gmail = req.body.gmail as gmail_v1.Gmail;
	const { threadId } = req.params;

	const thread = await getThread(gmail, threadId);

	res.send(thread);
});

gmailRoute.post("/send", async (req, res) => {
	const gmail = req.body.gmail as gmail_v1.Gmail;

	const requestBody = req.body as IMessage;
	if (
		!("subject" in requestBody && "text" in requestBody && "to" in requestBody)
	)
		return res.status(500).send("Invalid request body");

	const sentMail = await sendMessage(gmail, requestBody);
	res.send(sentMail);
});

export default gmailRoute;
