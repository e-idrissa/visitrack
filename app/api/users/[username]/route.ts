import { db } from "@/lib/db/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();

    const user = await db.user.findFirst({
      where: {
        username: values.username,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(values.pwd, user.pwd);

    if (!isPasswordMatch) {
      return new NextResponse("Incorrect password", { status: 401 });
    };

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}