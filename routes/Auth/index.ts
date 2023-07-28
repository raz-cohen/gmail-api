import express from "express";
import oauth2Client from "../../services/auth/oauth2Client";

const authRoute = express.Router();

const SCOPES = ["https://mail.google.com/"];

authRoute.get("/", (req, res) => {
	const url = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
	});

	res.send(url);
});

authRoute.get("/oauth2callback", async (req, res) => {
	const code = req.query.code;
	if (!code) return res.status(500).send("Missing code query");

	const { tokens } = await oauth2Client.getToken(code as string);
	oauth2Client.setCredentials(tokens);
	res.send(tokens);
});

export default authRoute;
