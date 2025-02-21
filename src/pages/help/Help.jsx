import { Link as LinkIcon } from "lucide-react";
import { Link } from "react-router";

import React from "react";

const Help = () => {
  return (
    <div className="bg-[#0f0f10] text-[#e1e4e8] min-h-screen flex flex-col justify-center items-center w-full px-6 py-10">
      <div className="max-w-2xl text-center">
        <h1 className="text-2xl font-bold text-[#f0f0f0] mb-4">
          Tips to Successfully Use This Tool
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          This AI-powered text processor works only in Chrome when the following
          conditions are met:
        </p>

        <ul className="text-left space-y-4">
          <li className="flex gap-2 flex-col md:flex-row">
            <span className="font-semibold text-[#f0f0f0] w-44">
              Operating system:
            </span>
            <span className="text-gray-400 flex-1">
              Windows 10 or 11; macOS 13+ (Ventura and onwards); or Linux.
              Chrome for Android, iOS, and ChromeOS are not yet supported by our
              APIs backed by Gemini Nano.
            </span>
          </li>
          <li className="flex gap-2 flex-col md:flex-row">
            <span className="font-semibold text-[#f0f0f0] w-44">Storage:</span>
            <span className="text-gray-400 flex-1">
              At least 22 GB on the volume that contains your Chrome profile.
            </span>
          </li>
          <li className="flex gap-2 flex-col md:flex-row">
            <span className="font-semibold text-[#f0f0f0] w-44">GPU:</span>
            <span className="text-gray-400 flex-1">
              Strictly more than 4 GB of VRAM.
            </span>
          </li>
          <li className="flex gap-2 flex-col md:flex-row">
            <span className="font-semibold text-[#f0f0f0] w-44">Network:</span>
            <span className="text-gray-400 flex-1">
              Unlimited data or an unmetered connection.
            </span>
          </li>
        </ul>
        <div className="mt-6">
          <ul className="text-left space-y-4">
            <h2>
              Enable Gemini Nano (All of the APIs are available on localhost in
              Chrome.)
            </h2>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 1:</span>
              <span className="text-gray-400 flex-1">
                Search{" "}
                <a
                  href="chrome://flags/#prompt-api-for-gemini-nano"
                  className="underline font-bold"
                >
                  chrome://flags/#prompt-api-for-gemini-nano.
                </a>
              </span>
            </li>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 2:</span>
              <span className="text-gray-400 flex-1">Select Enabled</span>
            </li>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 3:</span>
              <span className="text-gray-400 flex-1">
                Click Relaunch or restart Chrome.
              </span>
            </li>
            <p>
              To confirm Gemini Nano has downloaded and works as intended, open
              DevToolsn (right click any where on your browser, click on
              inspect, click on console and and type{" "}
              <span className="text-[#f0f0f0] font-semibold">
                (await ai.languageModel.capabilities()).available;
              </span>
              ) into the console. This should return readily
            </p>
            <p>
              if the step doesn't return readily, try restarting Chrome. contact
              support on:{" "}
              <span className="text-[#f0f0f0] font-semibold">
                hello@aiwordprocessor.com
              </span>
            </p>
          </ul>
        </div>

        <div className="mt-6">
          <ul className="text-left space-y-4">
            <h2>
              Enable Translator API (All of the APIs are available on localhost
              in Chrome.)
            </h2>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 1:</span>
              <span className="text-gray-400 flex-1">
                Search{" "}
                <a
                  href="chrome://flags/#translation-api"
                  className="underline font-bold"
                  target="_blank"
                >
                  chrome://flags/#translation-api
                </a>{" "}
              </span>
            </li>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 2:</span>
              <span className="text-gray-400 flex-1">
                Select Enabled without language pack limit
              </span>
            </li>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 3:</span>
              <span className="text-gray-400 flex-1">
                Click Relaunch or restart Chrome.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <ul className="text-left space-y-4">
            <h2>
              Enable Language Detection API (All of the APIs are available on
              localhost in Chrome.)
            </h2>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 1:</span>
              <span className="text-gray-400 flex-1">
                Search{" "}
                <a
                  href="chrome://flags/#language-detection-api"
                  className="underline font-bold"
                  target="_blank"
                >
                  chrome://flags/#language-detection-api
                </a>
              </span>
            </li>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 2:</span>
              <span className="text-gray-400 flex-1">Select Enabled</span>
            </li>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 3:</span>
              <span className="text-gray-400 flex-1">
                Click Relaunch or restart Chrome.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <ul className="text-left space-y-4">
            <h2>
              Enable Summarizer API (All of the APIs are available on localhost
              in Chrome.)
            </h2>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 1:</span>
              <span className="text-gray-400 flex-1">
                Search{" "}
                <a
                  href="chrome://flags/#summarization-api-for-gemini-nano"
                  target="_blank"
                  className="underline font-bold"
                >
                  chrome://flags/#summarization-api-for-gemini-nano
                </a>{" "}
              </span>
            </li>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 2:</span>
              <span className="text-gray-400 flex-1">Select Enabled</span>
            </li>
            <li className="flex gap-2 flex-col md:flex-row">
              <span className="font-semibold text-[#f0f0f0] w-44">Step 3:</span>
              <span className="text-gray-400 flex-1">
                Click Relaunch or restart Chrome.
              </span>
            </li>
          </ul>
        </div>
      </div>{" "}
      <Link
        to="/"
        className="my-10 flex items-center justify-center gap-2 cursor-pointer border border-gray-300 rounded-lg py-2 px-4 !bg-[#0f0f10] dark:bg-[#0f0f10] !z-[9999]"
      >
        <LinkIcon className="text-[#e1e4e8] w-4 h-4" />
        <span className="shrink-0">Language Processor</span>
      </Link>
    </div>
  );
};

export default Help;
