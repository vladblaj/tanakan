"use client";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { Await } from "@/api/utils";
import { useSession } from "@clerk/nextjs";
import Loading from "@/app/loading";
import { RealtimeChannel } from "@supabase/realtime-js";

export type SupabaseClientType = Await<ReturnType<typeof getSupabaseClient>>;

export type SupabaseContextType = {
  client: Await<ReturnType<typeof getSupabaseClient>>;
  messageChannel?: RealtimeChannel;
};

const getSupabaseClient = async (supabaseAccessToken: string) => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
      realtime: {
        params: {
          eventsPerSecond: 1000,
        },
      },
    }
  );
};

const supabaseContextProvider = createContext<SupabaseContextType>({
  client: {} as SupabaseClientType,
});
export const SupabaseProvider = ({ children }: PropsWithChildren) => {
  const [client, setClient] = useState<SupabaseClientType>();
  const [messageChannel, setMessageChannel] = useState<RealtimeChannel>();
  const { session, isLoaded } = useSession();

  const setSupabaseClient = useCallback(async () => {
    if (!isLoaded) {
      console.log("1 Useffect");
      return;
    }

    const accessToken = await session?.getToken({
      template: "supabase",
    });
    if (!accessToken) {
      throw new Error("can not read supabase access token");
    }
    const supabase = await getSupabaseClient(accessToken);

    setClient(supabase);
  }, [session, isLoaded]);

  useEffect(() => {
    setSupabaseClient();
  }, [setSupabaseClient]);

  useEffect(() => {
    if (messageChannel || !client || !isLoaded) {
      return;
    }
    const channel = client
      ?.channel("test", {
        config: {
          broadcast: {
            self: true,
          },
        },
      })
      .subscribe();
    setMessageChannel(channel);
  }, [client, isLoaded, messageChannel]);

  if (!client) {
    return <Loading />;
  }
  return (
    <supabaseContextProvider.Provider value={{ client, messageChannel }}>
      {children}
    </supabaseContextProvider.Provider>
  );
};

export const useSupabaseClient = () => useContext(supabaseContextProvider);
