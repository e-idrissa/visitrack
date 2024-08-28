import { db } from "../db/prisma";
import { format } from "date-fns"

export async function GetVisits() {
  try {
    const visits = await db.visit.findMany();

    return visits;
  } catch (error) {
    console.log("Error fetching visits", error);
  }
}

export async function GetDailyVisits() {
  try {
    const today = new Date();
    const formattedToday = format(today, 'yyyy-MM-dd');

    const visits = await db.visit.findMany({
      where: {
        createdAt: {
          gte: new Date(`${formattedToday}T00:00:00`),
          lte: new Date(`${formattedToday}T23:59:59`),
        },
      },
    });

    return visits;
  } catch (error) {
    console.log("Error fetching visits", error);
  }
}
