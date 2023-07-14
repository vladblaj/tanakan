import { SupabaseClientType } from "@/context/supabaseContext";
import { RealtimePresenceState } from "@supabase/supabase-js";
import { uniqBy } from "lodash";
import { SupaUser } from "@/types/tanakan";

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
export const getUniqueUsers = (
  presenceState: RealtimePresenceState<{}>
): any => {
  return uniqBy(
    Object.values(presenceState)
      .flat(1)
      .map((u) => u as SupaUser),
    (obj) => obj.userId
  );
};
