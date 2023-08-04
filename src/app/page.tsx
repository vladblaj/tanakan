import { UserPreviewContainer } from "@/components/UserPreviewContainer";
import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  return (
    <main className="flex flex-col items-center overflow-hidden justify-between">
      <div className="container h-screen">
        <div className="min-w-full border h-screen rounded border-secondary lg:grid lg:grid-cols-3">
          <UserPreviewContainer />
          <ChatWindow />
        </div>
      </div>
    </main>
  );
}
