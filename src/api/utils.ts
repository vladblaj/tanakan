import {createClient} from "@supabase/supabase-js";
import {Database} from "@/types/supabase";

export const supabaseClient = async (supabaseAccessToken: string) => {
  return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_KEY || "",
      {
        global: {headers: {Authorization: `Bearer ${supabaseAccessToken}`}},
      }
  );
};