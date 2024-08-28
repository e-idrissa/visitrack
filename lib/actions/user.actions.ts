import { db } from "../db/prisma";

export async function GetUser(username: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        username: username,
      },
    });
    return user;
  } catch (error) {
    console.log("Error fetching the user", error);
  }
}
