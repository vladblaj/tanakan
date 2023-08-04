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
    messageChannel?.on("broadcast", { event: "supa" }, (data) => {
      setMessages((messages) => [
        ...messages,
        {
          from: data.payload.from,
          fromMe: data.payload.userId === userId,
          avatarUrl: data.payload.avatarUrl,
          text: data.payload.text,
          userId: data.payload.userId,
        },
      ]);
    });
  }, [messageChannel, userId]);

  return (
    <div className="lg:col-span-2 lg:block">
      <div className="flex flex-col w-full h-screen">
        <div className="flex items-center p-3 border-b border-secondary">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
        <div className="relative w-ful flex-grow p-6 overflow-y-auto">
          <ul className="space-y-2">
            {messages.map((message, i) => (
              <Message
                key={i}
                from={message.from}
                fromMe={message.fromMe}
                avatarUrl={message.avatarUrl}
                text={message.text}
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
