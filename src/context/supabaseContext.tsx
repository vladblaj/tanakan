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
import { useSession, useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";
import { RealtimeChannel } from "@supabase/realtime-js";
import { SupaUser } from "@/types/tanakan";
import useTanakanStore from "@/store";

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
  const { user } = useUser();
  const { addUser, removeUserById } = useTanakanStore();
  const setSupabaseClient = useCallback(async () => {
    if (!isLoaded) {
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
    console.log("SEEEE EXECUTA");
    const channel = client
      ?.channel("test", {
        config: {
          broadcast: {
            self: true,
          },
        },
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        addUser(newPresences[0] as SupaUser);
        console.log("joined", newPresences);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        removeUserById(key);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            user: user?.id,
            name: user?.fullName,
            avatar: user?.imageUrl,
            online_at: new Date().toISOString(),
          });
        }
      });
    setMessageChannel(channel);
  }, [addUser, client, isLoaded, messageChannel, removeUserById, user]);

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
