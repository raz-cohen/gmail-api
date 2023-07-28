import express from "express";
import cors from "cors";
import authRoute from "./routes/Auth";
import "dotenv/config";

const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening on: ${process.env.BASE_URL}:${PORT}`);
});
