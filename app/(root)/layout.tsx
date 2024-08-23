import Insight from "@/components/custom/insight";
import NavList from "@/components/custom/nav-list";
import { User } from "@/components/custom/user";
import { Activity, ChartNoAxesColumn } from "lucide-react";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const insights = [
    { label: "yesterday's Visits", count: 123, icon: Activity },
    { label: "Average Visits", count: 123, icon: ChartNoAxesColumn },
  ];
  return (
    <div className="w-full h-full relative">
      <div className="w-full min-h-1/4 relative overflow-hidden bg-pattern">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <span className="font-bold text-white text-xl">VisiTrack</span>
            </div>
            <div className="flex items-center gap-x-4">
              <NavList />
              <User />
            </div>
          </div>
          <div className="font-bold text-4xl pt-16 pb-8 flex items-center">
            <span className="text-white">Welcome back</span>
            <span>👋</span>
          </div>
          <div className="pb-56 flex gap-x-3">
            {insights.map(({ label, count, icon}) => (
                <Insight label={label} count={count} icon={icon}/>
            ))}
            </div>
        </div>
      </div>
      {children}
    </div>
  );
}
