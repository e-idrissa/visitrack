import { db } from "../db/prisma";
import { subDays, format, startOfDay, endOfDay, differenceInCalendarDays } from 'date-fns';

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

export async function GetVisit(id: string) {
  const visit = await db.visit.findUnique({
    where: { id },
  });

  return visit
}

export async function GetYesterdaysVisits(): Promise<number> {
  try {
    const yesterday = subDays(new Date(), 1);
    const formattedYesterdayStart = startOfDay(yesterday);
    const formattedYesterdayEnd = endOfDay(yesterday);

    const visits = await db.visit.findMany({
      where: {
        createdAt: {
          gte: formattedYesterdayStart,
          lte: formattedYesterdayEnd,
        },
      },
    });

    return visits.length; // Returning the number of visits
  } catch (error) {
    console.log("Error fetching visits", error);
    throw error;
  }
}

export async function GetAverageDailyVisits(): Promise<number> {
  try {
    // Fetch all visits from the database
    const visits = await db.visit.findMany({
      select: {
        createdAt: true,
      },
    });

    // If no visits, return 0
    if (visits.length === 0) {
      return 0;
    }

    // Group visits by day
    const visitCountsByDay: { [key: string]: number } = {};

    visits.forEach(visit => {
      const day = format(visit.createdAt, 'yyyy-MM-dd');
      visitCountsByDay[day] = (visitCountsByDay[day] || 0) + 1;
    });

    // Calculate the average number of visits per day
    const totalDays = Object.keys(visitCountsByDay).length;
    const totalVisits = visits.length;
    const averageVisitsPerDay = totalVisits / totalDays;

    return averageVisitsPerDay;
  } catch (error) {
    console.error("Error fetching or calculating visits:", error);
    throw error; // Re-throw the error for proper handling in calling code
  }
}
