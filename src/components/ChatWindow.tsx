"use client";
import { ChatControls } from "@/components/ChatControls";
import { Message, MessageProps } from "@/components/Message";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useSupabaseClient } from "@/context/supabaseContext";
import { useEffect, useState } from "react";

export const ChatWindow = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { messageChannel } = useSupabaseClient();

  const { userId } = useAuth();
  useEffect(() => {
    console.log("useEffect din chat window", messageChannel);

    messageChannel?.on("broadcast", { event: "supa" }, (data) => {
      console.log("data", data);
      setMessages((messages) => [
        ...messages,
        {
          text: data.payload.text,
          userId: data.payload.userId,
          fromMe: data.payload.userId === userId,
        },
      ]);
    });
  }, [messageChannel, userId]);

  return (
    <div className="hidden lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="relative flex items-center p-3 border-b border-gray-300">
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
          <ul className="space-y-2">
            {messages.map((message, i) => (
              <Message
                key={i}
                text={message.text}
                fromMe={message.fromMe}
                userId={message.userId}
              />
            ))}
          </ul>
        </div>

        <ChatControls />
      </div>
    </div>
  );
};
