// import { cn } from "@/lib/utils";
// import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";
import Markdown from "markdown-to-jsx";
import Code from "./ui/Code";
const MessageList = ({ messages, isLoading = false }) => {
  if (isLoading) return;
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
  </div>;
  if (!messages) return <></>;
  return (
    <div className="flex flex-col gap-2 px-4 py-6 ">
      {messages.map((message) => (
        <div
          className={`flex ${
            message.role === "user" ? "justify-end pl-10" : message.role === "assistant" ? "justify-start pr-10" : ""
          }`}
          key={message.id}
        >
          <div
            className={`rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10 ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : message.role === "assistant"
                ? "bg-gray-200 text-slate-600"
                : ""
            }`}
          >
            <div className="py-2">
              {message.role === "user" ? <p>{message.content}</p> : <MyMarkdown text={message.content} />}{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MyMarkdown = ({ text }) => {
  return (
    <div className="markdown">
      <Markdown
        options={{
          overrides: {
            pre: {
              component: Code,
            },
          },
        }}
      >
        {text}
      </Markdown>
    </div>
  );
};

export default MessageList;
