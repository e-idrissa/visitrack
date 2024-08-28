"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UserMessage } from "@/lib/utils"
import { User as UserType } from "@prisma/client"
import axios from "axios"
import { Loader2, LogOut, User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
  user: UserType
}

export function User({ user }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const logout = async () => {
    try {
      setIsLoading(true)
    const res = await axios.patch(`api/users/${user.username}/logout`, user)
    if (res.status === 200) {
      setIsLoading(false)
      router.push("/login")
    }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="hover:bg-transparent group px-3 py-1 text-white/80 text-md hover:text-white/80">
          <div className="group-hover:bg-white/20 flex items-center rounded-md py-1 px-3">
            <User2 className="size-5 text-white/80 mr-1"/>
            Profile
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 text-primary">
        <div className="flex items-start gap-x-1 border-b border-primary/50 pb-2">
          <div className="rounded-full bg-gray-400 flex items-center justify-center p-2">
            <User2 className="size-5 text-white"/>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">@{user.username}</span>
            <span className="text-muted-foreground text-xs">{UserMessage(user.createdAt)}</span>
          </div>
        </div>
        <Button className="flex items-center py-1 rounded mt-2 bg-slate-50 hover:bg-slate-100 px-2 text-sm w-full" variant="ghost" onClick={logout}>
          {!isLoading ? (<LogOut className="size-4 text-primary mr-2"/>) : (<Loader2 className="size-4 animate-spin text-primary mr-2"/>)}
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  )
}
