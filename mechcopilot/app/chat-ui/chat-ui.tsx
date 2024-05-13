"use client";
import { useState, useRef } from "react";
import { IChatGPTPayload } from "../api/openai/route";

// import { Header } from "./header";
import { PromptInput } from "./prompt-input";

export const ChatUI = () => {
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  const promptChatGPT = async (payload: IChatGPTPayload) => {
    
    setIsLoading(true);
    const response: Response = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseText = await response.text();
    setResponses(prevResponses => [...prevResponses, {response: responseText, type: 'bot'}]);
    setIsLoading(false);
    if(!isLoading) {
      scrollToBottom();
    }
  };

  return (
    <div className="overflow-hidden text-slate-400 p-5 gap-5 flex flex-col justify-end">
      <div className="text-slate-50 max-h-[50vh] overflow-y-auto flex flex-col items-start gap-3">
      {responses.map((response, index) => {
        if (response.type === 'bot') {
          return (
            <div className="bubble bot rounded-lg rounded-tl-none bg-slate-500 p-3 self-start" key={index}>
              {response.response}
            </div>
          );
        } else {
          return (
            <div className="bubble user rounded-lg rounded-tr-none bg-slate-700 p-3 self-end" key={index}>
              {response.response}
            </div>
          );
        }
      })}
      <div ref={messagesEndRef} />
      </div>

      <PromptInput
        isLoading={isLoading}
        onSubmit={(prompt) => {
          promptChatGPT({ prompt });
          setResponses(prevResponses => [...prevResponses, {response: prompt, type: 'user'}]);
        }
        }
      />
    </div>
  );
};
