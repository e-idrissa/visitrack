import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const values = await req.json();
    console.log(values)
    const user = await db.user.findUnique({
      where: {
        id: values.data.userId,
      },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const visit = await db.visit.findUnique({
      where: {
        id: values.data.id,
      },
    });

    if (!visit) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const result = await db.visit.update({
      where: {
        id: visit.id,
      },
      data: {
        status: false,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[END VISIT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
