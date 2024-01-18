import { useEffect, useState } from "react";

import { useChat } from "ai/react";

import { Send } from "lucide-react";
import MessageList from "./MessageList";

const ChatComponent = () => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: `${import.meta.env.VITE_CHAT_API_ENDPOINT}/ai/chat`,
    onError: (err) => {
      messages.push({
        id: Date.now(),
        role: "assistant",
        content: "An error has occured, please try again.",
        error: true,
      });
    },
  });

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer)
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
  }, [messages]);
  return (
    <div className="relative h-screen max-h-screen bg-white overflow-auto w-full " id="message-container">
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-slate-600 font-semibold">Chat</h3>
      </div>
      <MessageList messages={messages} />

      <form onSubmit={handleSubmit} className="sticky bottom-0 inset-x-0 px-2  bg-white">
        <div className="flex">
          <input
            placeholder="Ask any question..."
            className="w-full input input-bordered "
            value={input}
            onChange={handleInputChange}
          />
          <button className="bg-blue-600 ml-2 btn">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
