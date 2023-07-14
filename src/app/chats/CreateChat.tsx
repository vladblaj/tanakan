"use client";

import { useState, useTransition } from "react";
import { generateKeys } from "@/utils/generateKeys";
import { useAuth } from "@clerk/nextjs";
import { Chat } from ".prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  createChat: (chatName: string, publicKey: string) => Promise<Chat>;
};
export default function CreateChat({ createChat }: Props) {
  const [chatName, setChatName] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { userId } = useAuth();
  const createChatClient = async (chatName: string) => {
    if (userId) {
      const keyData = await generateKeys(userId, 256);
      const chat = await createChat(chatName, keyData.publicKey);
      localStorage.setItem(`chat-${chat.id}`, keyData.privateKey);
    }
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };
  return (
    <div className="flex flex-row mb-2">
      <input
        className="text-black"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
      />
      <button onClick={() => createChatClient(chatName)}>Create Chat</button>
    </div>
  );
}
