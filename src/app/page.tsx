import { ChatPreview } from "@/components/ChatPreview";
import { ChatPreviewContainer } from "@/components/ChatPreviewContainer";
import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
          <ChatPreviewContainer>
            <ChatPreview
              name="Jhon Don"
              lastSeen="25 minutes"
              message="bye"
              avatar={
                "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
              }
            />
            <ChatPreview
              name="Same"
              lastSeen="50 minutes"
              message="Good night"
              avatar={
                "https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
              }
            />
            <ChatPreview
              name="Emma"
              lastSeen="6 hour"
              message="Good Morning"
              avatar={
                "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
              }
            />
          </ChatPreviewContainer>
          <ChatWindow />
        </div>
      </div>
    </main>
  );
}
