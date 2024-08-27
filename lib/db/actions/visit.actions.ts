import { db } from "../prisma";

export async function getVisit(id: string) {
  const visit = await db.visit.findUnique({
    where: { id },
  });

  return visit
}
