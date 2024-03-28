// import { prisma } from "@/utils/prisma";
// import * as bcrypt from "bcrypt";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const body = await request.json();
//   const { email, password } = body;

//   if (!email || !password) {
//     return NextResponse.json(
//       { error: "Email and password are required" },
//       { status: 400 },
//     );
//   }

//   const exist = await prisma.user.findUnique({ where: { email: email } });

//   if (exist) {
//     return NextResponse.json(
//       { error: "User with this email already exists" },
//       { status: 400 },
//     );
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await prisma.user.create({
//     data: {
//       email,
//       hashedPassword,
//     },
//   });

//   return NextResponse.json(user);
// }
