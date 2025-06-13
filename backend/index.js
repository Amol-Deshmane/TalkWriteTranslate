import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongooseConnect from "./config/mongooseConnect.js";
import translationRouter from "./routes/translation-text.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/", translationRouter);

app.listen(PORT, async () => {
  await mongooseConnect();
  console.log(`http://localhost:${PORT}`);
});
