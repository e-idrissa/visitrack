"use client";

import { LoginFormSchema, SignupFormSchema } from "@/lib/db/schemas"
import axios from "axios";
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useState } from "react"
import { toast } from "sonner";
import { z } from "zod"

interface AuthContextProps {
  user: string | null
  login: (data: z.infer<typeof LoginFormSchema>) => Promise<void>
  signup: (data: z.infer<typeof SignupFormSchema>) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()

  const login = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      const res = await axios.post(`/api/users/${data.username}`, data);
      setUser(res.data.username)
      toast.success("Logged in successfully")
      router.push("/")
    } catch (error) {
      toast.error("Error Logging in")
      console.log("Error logging in")
    }
  }

  const signup = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      const res = await axios.post(`/api/users`, data);
      setUser(res.data.username)
      toast.success("Account created successfully")
      router.push("/")
    } catch (error) {
      toast.error("Error Signing up")
      console.log("Error Signing up", error)
    }
  }

  const logout = async () => {
    try {
      await setUser(null);
      router.push("/login")
    } catch (error) {
      console.error("Logout error", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}