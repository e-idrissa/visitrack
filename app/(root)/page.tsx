"use client"

import { useAuth } from "@/components/context/auth";
import { NewVisit } from "@/components/custom/new-visit";
import { columns } from "@/components/custom/tables/columns";
import { DataTable } from "@/components/custom/tables/data-table";
import { GetDailyVisits } from "@/lib/actions/visit.actions";
import { Visit } from "@prisma/client";

import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const dailyVisits = await GetDailyVisits();
        setVisits(dailyVisits!);
      } catch (error) {
        console.error("Failed to fetch daily visits:", error);
      }
    };

    fetchVisits();
  }, []); // Runs once on component mount

  return (
    <main className="text-primary">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium">Your daily Visits</h2>
        <div className="flex items-center gap-x-4">
          <NewVisit />
        </div>
      </div>
      <DataTable columns={columns} data={visits!} />
    </main>
  );
}
