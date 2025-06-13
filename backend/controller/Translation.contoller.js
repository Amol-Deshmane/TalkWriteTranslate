import translate from 'translate-google-api';
import Translation from '../model/TranslationModel.js';

const giveTranslatedText = async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;
  try {
    const result = await translate(text, { from: sourceLang, to: targetLang });
    const newTranslation = new Translation({
      text,
      translatedText: result[0],
      sourceLang,
      targetLang,
    });
    await newTranslation.save();
    res.status(200).json({ translatedText: result[0] });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
};

export default giveTranslatedText;
