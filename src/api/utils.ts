import { SupabaseClientType } from "@/context/supabaseContext";

export type Await<T> = T extends PromiseLike<infer U> ? U : T;
export const getAllChatsForUser = async (
  client: SupabaseClientType,
  userId: string
) => {
  return client
    .from("Chat")
    .select("id, ChatsUsers!inner(userId)")
    .eq("ChatsUsers.userId", userId);
};

import React, { createContext, useContext } from "react";

export const createGenericContext = <T extends unknown>() => {
  // Create a context with a generic parameter or undefined
  const genericContext = createContext<T | undefined>(undefined);

  // Check if the value provided to the context is defined or throw an error
  const useGenericContext = () => {
    const contextIsDefined = useContext(genericContext);
    if (!contextIsDefined) {
      throw new Error("useGenericContext must be used within a Provider");
    }
    return contextIsDefined;
  };

  return [useGenericContext, genericContext.Provider] as const;
};
