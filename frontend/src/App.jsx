import React, { useState, useEffect } from "react";
import "./App.css"; // Custom CSS
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaStopCircle } from "react-icons/fa";
import LanguagesSelect from "./components/LanguagesSelect";

const App = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [isLoading, setIsLoading] = useState(false);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) setSourceText(transcript);
  }, [transcript]);

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://multilingual-text-and-speech-translator.onrender.com/translate-text",
        { text: sourceText, sourceLang, targetLang }
      );
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeechToText = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening();
    }
  };

  const handleTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLang;
      speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  return (
    <div className="container">
      <h2 className="label">Text & Speech Translator</h2>

      <textarea
        className="textarea"
        placeholder="Enter text to translate"
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value)}
      />

      <div className="select-group">
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          <LanguagesSelect />
        </select>
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <LanguagesSelect />
        </select>
      </div>

      <button onClick={handleTranslate} className="btn primary">
        {isLoading ? "Translating..." : "Translate"}
      </button>

      <label className="label">Translated Text:</label>
      <textarea
        className="textarea"
        value={translatedText}
        readOnly
      />

      <button onClick={handleTextToSpeech} className="btn secondary">
        Play Translated Text
      </button>

      <button onClick={handleSpeechToText} className="btn secondary">
        {listening ? "Stop Listening" : "Start Listening"}{" "}
        {listening ? <FaStopCircle /> : <HiSpeakerWave />}
      </button>
    </div>
  );
};

export default App;
