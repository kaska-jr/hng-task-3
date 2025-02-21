import React from "react";
import { useLanguageProcessor } from "../../hooks/useLanguageProcessor";
import {
  ArrowLeftRight,
  Ban,
  Clipboard,
  Info,
  Loader,
  SendHorizontal,
  Volleyball,
  Volume2,
} from "lucide-react";
import SelectDropDown from "../../components/ui/SelectDropdown";
import ISO6391 from "iso-639-1";
import { Link } from "react-router";

const LanguageProcessor = () => {
  const {
    state,
    setState,
    normalizeLanguageCode,
    translateText,
    handleSubmit,
    handleSummarize,
    speakText,
  } = useLanguageProcessor();

  const [copySuccess, setCopySuccess] = React.useState(false);
  const handleCopyToClipboard = (text) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  return (
    <section className="bg-[#0f0f10] text-[#e1e4e8] min-h-screen flex flex-col justify-center items-center w-full px-4 pt-4">
      <div className="flex items-center justify-end gap-2  w-[98%] max-w-[800px] mx-auto rounded-lg py-2 px-4">
        <Link
          to="/help"
          className="flex items-center  gap-2 cursor-pointer w-fit border border-gray-300 rounded-lg py-2 px-4 !bg-[#0f0f10] dark:bg-[#0f0f10] !z-[9999]"
        >
          <Info className="text-[#e1e4e8] w-4 h-4" />
          <span>Help</span>
        </Link>
      </div>

      <div className="w-[98%] max-w-[800px] mx-auto relative">
        <div className="w-full px-4 pb-52 flex flex-col gap-5">
          {/* Copy Success */}
          {copySuccess && (
            <span className="h-fit w-fit text-green-500 bg-red-100 p-3 rounded-md mt-4 px-2 py-1 fixed top-3 right-0 left-0 mx-auto">
              Copied!
            </span>
          )}

          {state.downloading && state.downloadState && (
            <span className="h-fit w-fit text-green-500 bg-red-100 p-3 rounded-md mt-4 px-2 py-1 fixed top-6 right-0 left-0 mx-auto">
              {state.downloadState}
            </span>
          )}

          {/* Initial Text */}
          {!state.displayedText && (
            <div className="text-center">
              <h1 className="text-center text-lg lg:text-2xl font-bold mb-5">
                Readify your AI-Powered Word Processor
              </h1>
              <p className="text-center text-lg font-bold mb-10">
                Enter a text to detect, translate, and summarize.
              </p>
              <p>What can I help you with?</p>
              <p>
                To find helpful tips on how to successfully use this tool,{" "}
                <Link to={"/help"} className="text-[#e1e4e8] underline">
                  click here
                </Link>
              </p>
            </div>
          )}

          {/* Displayed Text */}
          {state.displayedText && (
            <div className="self-end">
              <p className="bg-[#1c1c2247] p-4 rounded-xl max-w-[400px] relative pb-12">
                <span className="text-sm">{state.displayedText}</span>
                <div className="absolute bottom-0 right-0 px-2 py-2 flex items-center gap-2">
                  <Clipboard
                    className="text-[#e1e4e8] w-4 h-4 cursor-pointer"
                    onClick={() => handleCopyToClipboard(state.displayedText)}
                  />

                  <span
                    className=" cursor-pointer flex items-center gap-2 text-sm"
                    onClick={() =>
                      speakText(
                        state.displayedText,
                        normalizeLanguageCode(
                          state.detection.result?.abbreviation || "en"
                        )
                      )
                    }
                  >
                    {state.detection.result?.language}
                    <Volume2 className="text-[#e1e4e8] w-4 h-4" />
                  </span>
                </div>
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 py-5">
                {state.displayedText.length > 150 &&
                state.detection.result?.abbreviation === "en" ? (
                  <div className="flex items-center gap-2">
                    <button
                      className="border border-gray-300 rounded-lg py-2 px-4 bg-[#e1e4e8] text-[#0f0f10] cursor-pointer flex items-center gap-2 h-10 hover:scale-[1.05] transition duration-300 ease-in-out disabled:opacity-20 disabled:hover:scale-100"
                      disabled={
                        state.summaryLoading || state.translationLoading
                      }
                      aria-label="Summarize Text"
                      onClick={() => handleSummarize()}
                    >
                      {state.summaryLoading ? (
                        <Loader className="animate-spin w-4 h-4" />
                      ) : (
                        <Volleyball className="w-4 h-4" />
                      )}
                      Summarize
                    </button>
                    <SelectDropDown
                      value={state.language}
                      onChange={(value) =>
                        setState((prev) => ({
                          ...prev,
                          language: value,
                          error: "",
                          translation: "",
                        }))
                      }
                    />
                    {!state.summary && (
                      <button
                        onClick={() => translateText(state.displayedText)}
                        disabled={
                          !state.displayedText ||
                          state.translationLoading ||
                          state.summaryLoading
                        }
                        aria-label="Translate text"
                        className="border border-gray-300 rounded-lg py-2 px-4 bg-[#e1e4e8] text-[#0f0f10] cursor-pointer flex items-center gap-2 h-10 hover:scale-[1.05] transition duration-300 ease-in-out disabled:opacity-20 disabled:hover:scale-100 "
                      >
                        {state.translationLoading ? (
                          <Loader className="animate-spin w-4 h-4" />
                        ) : (
                          <ArrowLeftRight className="w-4 h-4 translate rotate-90" />
                        )}{" "}
                        <span className="hidden md:block">Translate</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <SelectDropDown
                      value={state.language}
                      onChange={(value) =>
                        setState((prev) => ({
                          ...prev,
                          language: value,
                          error: "",
                          translation: "",
                        }))
                      }
                    />
                    <button
                      onClick={() => translateText(state.displayedText)}
                      disabled={
                        !state.displayedText || state.translationLoading
                      }
                      aria-label="Translate text"
                      className="border border-gray-300 rounded-lg py-2 px-4 bg-[#e1e4e8] text-[#0f0f10] cursor-pointer flex items-center gap-2 hover:scale-[1.05] transition duration-300 ease-in-out"
                    >
                      {state.translationLoading ? (
                        <Loader className="animate-spin w-4 h-4" />
                      ) : (
                        <ArrowLeftRight className="w-4 h-4 translate rotate-90" />
                      )}{" "}
                      Translate
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Summary */}
          {state.summary && (
            <div className="self-start">
              <h1 className="text-lg font-bold mb-2">Text Summary:</h1>
              <p className="bg-[#1c1c2247] p-4 rounded-xl max-w-[400px] relative pb-10">
                <span className="text-sm">{state.summary}</span>

                <div className="absolute bottom-0 right-0 px-2 py-2 flex items-center gap-2">
                  <Clipboard
                    className="text-[#e1e4e8] w-4 h-4 cursor-pointer"
                    onClick={() => handleCopyToClipboard(state.summary)}
                  />
                  <span
                    className="cursor-pointer flex items-center gap-2 text-sm"
                    onClick={() => speakText(state.summary, "en-US")}
                  >
                    <span>{ISO6391.getName("en")}</span>
                    <Volume2 className="text-[#e1e4e8] w-4 h-4" />
                  </span>
                </div>
              </p>

              <div className="flex items-center gap-2 mt-5">
                <SelectDropDown
                  aria-labelledby="language-label"
                  defaultValue={"en"}
                  value={state.language || "en"}
                  onChange={(value) => {
                    setState((prev) => ({
                      ...prev,
                      language: value,
                      error: "",
                      translation: "",
                    }));
                  }}
                />
                <button
                  onClick={() => {
                    translateText(state.summary);
                  }}
                  disabled={
                    !state.summary ||
                    state.error ||
                    state.summaryLoading ||
                    state.translationLoading
                  }
                  aria-label="Translate Summary"
                  className="flex items-center justify-center gap-2 border border-gray-300 outline-none focus-within:outline-0 rounded-lg py-2 px-4 text-[#0f0f10] dark:text-[#0f0f10] bg-[#e1e4e8] dark:bg-[#e1e4e8]text-lg cursor-pointer disabled:opacity-20 hover:scale-[1.05] transition duration-300 ease-in-out"
                >
                  {state.translationLoading ? (
                    <Loader className="animate-spin w-4 h-4" />
                  ) : (
                    <ArrowLeftRight className="w-4 h-4 translate rotate-90" />
                  )}{" "}
                  Translate
                </button>
              </div>
            </div>
          )}

          {state.translation && (
            <div className="self-start mt-5">
              <h1 className=" text-lg font-bold mb-2">Text Translation:</h1>

              <p className="shadow-sm bg-[#1c1c2247] p-4 rounded-xl w-full max-w-[400px] relative pb-12">
                <span className="text-sm">{state.translation}</span>

                <div className="absolute bottom-0 right-0 px-2 py-2 flex items-center gap-2">
                  <Clipboard
                    className="text-[#e1e4e8] w-4 h-4 cursor-pointer"
                    onClick={() => handleCopyToClipboard(state.translation)}
                  />
                  <span
                    className="flex items-center gap-2 cursor-pointer text-sm"
                    onClick={() =>
                      speakText(
                        state.translation,
                        normalizeLanguageCode(state.language)
                      )
                    }
                  >
                    {ISO6391.getName(state.language)}
                    <Volume2 className="text-[#e1e4e8] dark:text-[#e1e4e8] w-4 h-4" />
                  </span>
                </div>
              </p>
            </div>
          )}
        </div>

        <div className="h-fit fixed bottom-0 bg-[#0f0f10] dark:bg-[#0f0f10] pb-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] mx-auto">
          {state.error && (
            <div className="absolute -top-[60%] md:-top-[60%] h-fit text-red-500 bg-red-100 p-3 rounded-md mt-4 w-full max-w-[400px] mb-96 flex items-start gap-2 text-xs">
              <Ban className="text-red-500 w-4 h-5 flex-shrink-0" />
              {state.error}
            </div>
          )}

          <div className="flex flex-col gap-6 relative shadow-sm bg-[#1c1c2247] p-4 rounded-xl">
            <textarea
              name="text"
              id="text"
              aria-label="Input text field"
              value={state.text}
              onChange={(e) =>
                setState({
                  ...state,
                  text: e.target.value,
                  error: "",
                })
              }
              placeholder="Type your message here..."
              className="outline-none focus-within:outline-0 rounded-lg p-2 text-[#e1e4e8] dark:text-[#e1e4e8] w-full border-0 resize-none bg-transparent h-[30px] lg:h-[50px]"
            ></textarea>
            <button
              onClick={handleSubmit}
              aria-label="Send text"
              className="flex items-center justify-center gap-2 border border-gray-300 outline-none focus-within:outline-0 rounded-lg h-10 w-10 text-[#0f0f10] dark:text-[#0f0f10] bg-[#e1e4e8] dark:bg-[#e1e4e8]text-lg cursor-pointer disabled:opacity-20"
            >
              {state?.detectionState?.loading ? (
                <Loader className="animate-spin w-5 h-5 text-[#0f0f10] dark:text-[#0f0f10]" />
              ) : (
                <SendHorizontal className="w-5 h-5 text-[#0f0f10] dark:text-[#0f0f10]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageProcessor;
