import express from "express";
import giveTranslatedText from "../controller/Translation.contoller.js";

const translationRouter = express.Router();

translationRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my text and speech translator backend deployment!",
  });
});

translationRouter.post("/translate-text", giveTranslatedText);

export default translationRouter;
