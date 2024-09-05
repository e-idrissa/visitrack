import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const values = await req.json();
    const user = await db.user.findUnique({
      where: {
        id: values.userId,
      },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const visit = await db.visit.findUnique({
      where: {
        id: values.visitId,
      },
    });

    if (!visit) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const setDate = (date: Date, hour: number, minutes: number): Date => {
      const updatedDate = new Date(date);
      const dateWithHour = updatedDate.setHours(hour, minutes, 0, 0);
      return updatedDate;
    };

    const leavingDate = new Date();

    const status = values.data.status === "inProgress" ? true : false;

    const result = await db.visit.update({
      where: {
        id: visit.id,
      },
      data: {
        name: values.data.name,
        lastname: values.data.lastname,
        reason: values.data.reason,
        status: status,
        leaving_at: setDate(
          leavingDate,
          values.data.endingHour,
          values.data.endingMin
        ),
        entering_at: setDate(
          visit.entering_at,
          values.data.startingHour,
          values.data.startingMin
        ),
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[VISIT]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const values = await req.json();

    const user = await db.user.findUnique({
      where: {
        id: values.userId,
      },
    })

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const visit = await db.visit.findUnique({
      where: {
        id: values.id,
      },
    });

    if (!visit) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const result = await db.visit.delete({
      where: {
        id: visit.id,
      },
    });

    return NextResponse.json(result)
  } catch (error) {
    console.log(["DELETE VISIT"], error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}