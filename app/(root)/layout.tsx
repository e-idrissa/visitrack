"use client"

import { useAuth } from "@/components/context/auth";
import NavList from "@/components/custom/nav-list";
import { User } from "@/components/custom/user";
import { Activity, ChartNoAxesColumn } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { GetAverageDailyVisits, GetYesterdaysVisits } from "@/lib/actions/visit.actions";
import Insights from "@/components/custom/cards";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { user } = useAuth(); // Get the user and authentication actions

  if(!user) redirect("/login")

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
              <User user={user}/>
            </div>
          </div>
          <div className="font-bold text-4xl pt-10 pb-8 flex items-center">
            <span className="text-white">Welcome back, @{user}</span>
            <span>👋</span>
          </div>
          <Insights />
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
