"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { z } from "zod";
import { LoginFormSchema, SignupFormSchema } from "@/lib/db/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthContextProps {
  user: string | null;
  login: (data: z.infer<typeof LoginFormSchema>) => Promise<void>;
  signup: (data: z.infer<typeof SignupFormSchema>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      console.log(data);
      const res = await axios.post(`/api/users/${data.username}`, data);
      const username = res.data.username
      setUser(username);
      console.log("CONTEXT", user)
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Login error", error);
      toast.success("Login error");
      router.refresh();
    }
  };

  const signup = async (data: z.infer<typeof SignupFormSchema>) => {
    try {
      const res = await axios.post(`/api/users`, data);
      setUser(res.data.username);
      toast.success("Account created successfully");
      router.push("/");
    } catch (error) {
      console.error("Signup error", error);
      toast.success("Signup error");
      router.refresh();
    }
  };

  const logout = async () => {
    try {
      await setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }
  return context;
};
