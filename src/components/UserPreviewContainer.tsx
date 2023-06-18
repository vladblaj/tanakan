"use client";
import useTanakanStore from "@/store";
import { OnlineUser } from "@/components/OnlineUser";

export const UserPreviewContainer = () => {
  const { onlineUsers } = useTanakanStore();
  return (
    <div className="border-r border-gray-300 lg:col-span-1">
      <div className="mx-3 my-3">
        <div className="relative text-gray-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-gray-300"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            type="search"
            className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
            name="search"
            placeholder="Search"
            required
          />
        </div>
      </div>
      <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Users</h2>
      <ul className="overflow-auto h-[32rem]">
        {onlineUsers.map((user, key) => (
          <OnlineUser
            key={key}
            name={user.name}
            lastSeen={user.online_at}
            message=""
            avatar={user.avatar}
          />
        ))}
      </ul>
    </div>
  );
};
