import { prisma } from "@/utils/prisma";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  console.log(body)
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  console.log(user)
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  }
  return NextResponse.json(null);
}
