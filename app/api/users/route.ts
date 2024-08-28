import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const values = await req.json()

    const saltRound = 10
    const cryptPwd = await bcrypt.hash(values.pwd, saltRound);

    const user = await db.user.create({
        data: {
            username: values.username,
            pwd: cryptPwd,
        }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
