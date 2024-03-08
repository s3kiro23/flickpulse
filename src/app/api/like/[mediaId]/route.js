import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request, { params: { mediaId } }) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.log(token)

  try {
    const user = await prisma.user.update({
      where: {
        email: token.email,
      },
      data: {
        mediaLikes: {
          create: [
            {
              mediaId,
            },
          ],
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error) {
      return NextResponse.json(
        {
          message: `Le couple userId / mediaId existe déjà, message: ${error}`,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(user);
  }
}
