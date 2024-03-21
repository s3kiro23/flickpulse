import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request, { params: { mediaId } }) {
  const token = await getToken({ req: request });
  const body = await request.json();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.log(token);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: token.email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        mediaLikes: {
          create: [
            {
              mediaId,
              mediaType: body.type,
            },
          ],
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 },
    );
  }
}
