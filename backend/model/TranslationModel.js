import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  text: String,
  translatedText: String,
  sourceLang: String,
  targetLang: String,
  timestamp: { type: Date, default: Date.now },
});

const Translation = mongoose.model("Translation", translationSchema);

export default Translation;
