import { OnlineUser } from "@/components/OnlineUser";
import { UserPreviewContainer } from "@/components/UserPreviewContainer";
import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
          <UserPreviewContainer />
          <ChatWindow />
        </div>
      </div>
    </main>
  );
}
