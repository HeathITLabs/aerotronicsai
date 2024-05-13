"use client";
import { useState } from "react";
import { IChatGPTPayload } from "../api/openai/route";

// import { Header } from "./header";
import { PromptInput } from "./prompt-input";

export const ChatUI = () => {
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const promptChatGPT = async (payload: IChatGPTPayload) => {
    setIsLoading(true);
    const response: Response = await fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setResponse(await response.text());
    setIsLoading(false);
  };

  return (
    <div className="overflow-hidden text-slate-400 p-5 gap-5 flex flex-col justify-end">
      <div className="text-slate-50 max-h-[50vh] overflow-y-auto">
        {response}
      </div>

      <PromptInput
        isLoading={isLoading}
        onSubmit={(prompt) =>
          promptChatGPT({ prompt })
        }
      />
    </div>
  );
};
