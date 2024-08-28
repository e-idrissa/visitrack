import { GetUser } from "@/lib/actions/user.actions";
import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const values = await req.json();
    const user = await GetUser(values.username);

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await db.visit.create({
      data: {
        name: values.data.name,
        lastname: values.data.lastname,
        reason: values.data.reason,
        leaving_at: null,
        userId: user.id
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[VISITS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
