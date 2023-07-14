import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prismaClient } from "@/utils/prisma";

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) {
    console.log("clerk userId not found");
    return;
  }
  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });
  return NextResponse.json(user);
}

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    console.log("clerk userId not found");
    return;
  }
  const data = await request.json();
  const user = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      publicKey: data.publicKey,
    },
  });
  return new Response(JSON.stringify(user), { status: 200 });
}
