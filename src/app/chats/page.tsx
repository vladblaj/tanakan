import CreateChat from "@/app/chats/CreateChat";
import { prismaClient } from "@/utils/prisma";

export default async function Page() {
  const chats = await prismaClient.chat.findMany();

  const createChat = async (chatName: string, publicKey: string) => {
    "use server";
    return prismaClient.chat.create({
      data: {
        name: chatName,
        publicKey: publicKey,
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <CreateChat createChat={createChat} />
        <table className="table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Public Key</th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat) => (
              <tr key={chat.id}>
                <td>{chat.id}</td>
                <td>{chat.createdAt.toString()}</td>
                <td>{chat.publicKey}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
