import Insight from "@/components/custom/insight";
import NavList from "@/components/custom/nav-list";
import { User } from "@/components/custom/user";
import { GetUser } from "@/lib/actions/user.actions";
import { GetAverageDailyVisits, GetYesterdaysVisits } from "@/lib/actions/visit.actions";
import { Activity, ChartNoAxesColumn } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: { username: string };
}

export default async function Layout({ children, params }: Props) {
  const username = params.username
  const user = await GetUser(username)
  
  if (!user || user.isLogged === false) return redirect("/login")

  const yesterdaysVisits = await GetYesterdaysVisits();
  const averageVisits = await GetAverageDailyVisits();

  const insights = [
    { label: "yesterday's Visits", count: yesterdaysVisits!, icon: Activity },
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
              <NavList username={user.username}/>
              <User user={user}/>
            </div>
          </div>
          <div className="font-bold text-4xl pt-10 pb-8 flex items-center">
            <span className="text-white">Welcome back, @{user.username}</span>
            <span>👋</span>
          </div>
          <div className="pb-56 flex gap-x-3">
            {insights.map(({ label, count, icon}) => (
                <Insight key={label} label={label} count={count} icon={icon}/>
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
