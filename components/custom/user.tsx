"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User as UserType } from "@prisma/client";
import axios from "axios";
import { Loader2, LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  user: UserType;
};

export function User({ user }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`api/users/${user.username}/logout`, user);
      if (res.status === 200) {
        setIsLoading(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-transparent group px-3 py-1 text-white/80 text-md hover:text-white/80"
        >
          <div className="group-hover:bg-white/20 flex items-center rounded-md py-1 px-3">
            <User2 className="size-5 text-white/80 mr-1" />
            <span className="font-medium">{user.username}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 text-primary">
        <Button
          className="flex items-center py-1 rounded bg-slate-50 hover:bg-slate-100 px-2 text-sm w-full"
          variant="ghost"
          onClick={logout}
        >
          {!isLoading ? (
            <LogOut className="size-4 text-primary mr-2" />
          ) : (
            <Loader2 className="size-4 animate-spin text-primary mr-2" />
          )}
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}
