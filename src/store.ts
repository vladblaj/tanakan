import { create } from "zustand";
import { SupaUser } from "@/types/tanakan";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TanakanStore = {
  onlineUsers: SupaUser[];
  addUser: (user: SupaUser) => void;
  setUsers: (users: SupaUser[]) => void;
  removeUserById: (id: string) => void;
};

export const useTanakanStore = create<TanakanStore>()(
  devtools(
    immer((set) => ({
      onlineUsers: [],
      addUser: (user: SupaUser) =>
        set((state: TanakanStore) => {
          if (!state.onlineUsers.find((u) => u.userId === user.userId)) {
            state.onlineUsers.push(user);
          }
        }),
      removeUserById: (userId: string) =>
        set((state: TanakanStore) => {
          state.onlineUsers = state.onlineUsers.filter(
            (u) => u.userId !== userId
          );
        }),
      setUsers: (users: SupaUser[]) =>
        set((state: TanakanStore) => {
          state.onlineUsers = users;
        }),
    })),
    {
      name: "tanakan-storage",
    }
  )
);
export default useTanakanStore;
