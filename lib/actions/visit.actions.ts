import { db } from "../db/prisma";

export async function GetVisits() {
  try {
    const visits = await db.visit.findMany();

    return visits;
  } catch (error) {
    console.log("Error fetching visits", error);
  }
}
