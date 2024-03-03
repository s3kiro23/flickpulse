import { prisma } from "@/utils/prisma";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const user = await prisma.user.findFirst({
    where: {
      pseudo: body.pseudo,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  }
  return NextResponse.json(null);
}
