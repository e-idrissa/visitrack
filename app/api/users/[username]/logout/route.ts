import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const user = await req.json();

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const result = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isLogged: false,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[LOGOUT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
