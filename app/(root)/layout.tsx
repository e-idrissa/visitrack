"use client"; // Mark this component as a client component

import { useAuth } from "@/components/context/auth";
import Insight from "@/components/custom/insight";
import NavList from "@/components/custom/nav-list";
import { User } from "@/components/custom/user";
import { Activity, ChartNoAxesColumn } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetAverageDailyVisits, GetYesterdaysVisits } from "@/lib/actions/visit.actions";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { user } = useAuth(); // Get the user and authentication actions
  const router = useRouter();
  
  const [yesterdaysVisits, setYesterdaysVisits] = useState<number | null>(null);
  const [averageVisits, setAverageVisits] = useState<number | null>(null);

  console.log("LAYOUT", user)

  // Fetch the visits data using client-side rendering
  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login if the user is not authenticated
    }

    // Fetch yesterday's visits
    const fetchVisits = async () => {
      try {
        const response = await GetYesterdaysVisits()
        setYesterdaysVisits(response);
      } catch (error) {
        console.error("Error fetching yesterday's visits:", error);
      }
    };

    // Fetch average daily visits
    const fetchAverageVisits = async () => {
      try {
        const response = await GetAverageDailyVisits()
        setAverageVisits(response);
      } catch (error) {
        console.error("Error fetching average visits:", error);
      }
    };

    fetchVisits();
    fetchAverageVisits();
  }, [user, router]);

  const insights = [
    { label: "Yesterday's Visits", count: yesterdaysVisits, icon: Activity },
    { label: "Average Visits", count: averageVisits, icon: ChartNoAxesColumn },
  ];

  return (
    <div className="w-full h-full relative">
      <div className="w-full min-h-1/4 relative overflow-hidden bg-pattern">
        <div className="container">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-x-2">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <span className="font-bold text-white text-xl">VisiTrack</span>
            </div>
            <div className="flex items-center gap-x-4">
              <NavList username={user!} />
              <User />
            </div>
          </div>
          <div className="font-bold text-4xl pt-10 pb-8 flex items-center">
            <span className="text-white">Welcome back, @{user}</span>
            <span>👋</span>
          </div>
          <div className="pb-56 flex gap-x-3">
            {insights.map(({ label, count, icon }) => (
              <Insight key={label} label={label} count={count ?? 0} icon={icon} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute flex items-center w-full -mt-48 z-10">
        <div className="container bg-white h-[40rem] rounded-t-2xl px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
