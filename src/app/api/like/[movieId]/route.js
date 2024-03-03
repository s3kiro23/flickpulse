import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request, { params: { movieId } }) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.update({
      where: {
        pseudo: token.token.user.pseudo,
      },
      data: {
        movieLikes: {
          create: [
            {
              movieId,
            },
          ],
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error) {
      return NextResponse.json(
        { message: "Le couple userId / movieId existe déjà" },
        { status: 400 },
      );
    }

    return NextResponse.json(user);
  }
}
