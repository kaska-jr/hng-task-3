import { useState } from "react";
import ISO6391 from "iso-639-1";

export const useLanguageProcessor = () => {
  const [state, setState] = useState({
    text: "",
    displayedText: "",
    summary: "",
    summaryLoading: false,
    language: "en",
    detection: { loading: false, result: null, canDetect: null },
    translation: "",
    translationLoading: false,
    error: "",
  });

  // Normalize Language Code for Speech
  const normalizeLanguageCode = (lang) =>
    ({
      en: "en-US",
      fr: "fr-FR",
      es: "es-ES",
      de: "de-DE",
      zh: "zh-CN",
      ig: "ig",
      yo: "yo",
      ha: "ha",
    }[lang] || lang);

  // Detect Language function
  const detectLanguage = async (text) => {
    try {
      setState((prev) => ({
        ...prev,
        detection: { ...prev.detection, loading: true },
      }));
      const { capabilities } = await self.ai.languageDetector.capabilities();

      if (capabilities === "no")
        return setState((prev) => ({
          ...prev,
          detection: { ...prev.detection, loading: false },
        }));

      const detector = await self.ai.languageDetector.create();
      const [{ detectedLanguage, confidence }] = await detector.detect(text);

      setState((prev) => ({
        ...prev,
        detection: {
          loading: false,
          result: {
            language: ISO6391.getName(detectedLanguage),
            abbreviation: detectedLanguage,
            confidence: `${(confidence * 100).toFixed(2)}%`,
          },
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message || "Detection failed.",
        detection: {
          loading: false,
        },
      }));
      console.log(error, "Detection Error");
    }
  };

  // Translate Text function
  const translateText = async (text) => {
    setState((prev) => ({ ...prev, translationLoading: true }));
    try {
      const translator = await self.ai.translator.create({
        sourceLanguage: state.detection.result?.abbreviation || "en",
        targetLanguage: state.language,
      });
      const translatedText = await translator.translate(text);
      setState((prev) => ({
        ...prev,
        translation: translatedText,
        translationLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message || "Translation failed.",
        translationLoading: false,
      }));
      console.log(error, "Translation Error");
    }
  };

  // Summarize Text function
  const summarizeText = async () => {
    setState((prev) => ({ ...prev, summaryLoading: true }));
    const summarizer = await self.ai.summarizer.create({
      type: "teaser",
      length: "short",
      sharedContext: "This is a scientific article",
      format: "markdown",
    });

    try {
      const summary = await summarizer.summarize(state.displayedText, {
        context: "Tech audience",
      });
      setState((prev) => ({ ...prev, summary, summaryLoading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error.message || "summarizing Failed",
        summaryLoading: false,
      }));
      console.log(error, "summarizing Error");
    }
  };

  // Handle Text Submission
  const handleSubmit = () => {
    if (!state.text) {
      setState((prev) => ({ ...prev, error: "Please enter some text." }));
      return;
    }
    setState((prev) => ({
      ...prev,
      summary: "",
      translation: "",
      displayedText: prev.text,
      text: "",
    }));
    detectLanguage(state.text);
  };

  const handleSummarize = async () => {
    setState((prev) => ({ ...prev, error: "", summary: "", translation: "" }));
    summarizeText();
  };

  const speakText = (text, speechLanguage) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLanguage;
      window.speechSynthesis.speak(utterance);
    } else {
      setError("Text-to-Speech is not supported in your browser.");
    }
  };

  return {
    state,
    setState,
    normalizeLanguageCode,
    detectLanguage,
    translateText,
    handleSubmit,
    handleSummarize,
    speakText,
  };
};
