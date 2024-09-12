import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { HashPwd } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const values = await req.json()
    
    if (values.pwd !== values.confPwd) {
      return new NextResponse("Passwords don't match", { status: 307 });
    }
    
    const cryptPwd = await HashPwd(values.pwd)

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
