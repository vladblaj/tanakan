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
import { Await, getUniqueUsers } from "@/utils/utils";
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
  const { session, isSignedIn, isLoaded } = useSession();
  const { user } = useUser();
  const { setUsers, addUser, removeUserById } = useTanakanStore();
  const setSupabaseClient = useCallback(async () => {
    if (!isSignedIn) {
      return;
    }
    console.log("rendering supabase provider", session?.status);

    const accessToken = await session?.getToken({
      template: "supabase",
    });
    if (!accessToken) {
      throw new Error("can not read supabase access token");
    }
    const supabase = await getSupabaseClient(accessToken);

    setClient(supabase);
  }, [isSignedIn, session]);

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
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setUsers(getUniqueUsers(state));
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        addUser(newPresences[0] as SupaUser);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        removeUserById(key);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            userId: user?.id,
            name: user?.fullName,
            avatar: user?.imageUrl,
            online_at: new Date().toISOString(),
          });
        }
      });
    setMessageChannel(channel);
  }, [
    addUser,
    client,
    isLoaded,
    messageChannel,
    removeUserById,
    setUsers,
    user,
  ]);

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
