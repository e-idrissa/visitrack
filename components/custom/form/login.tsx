"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/lib/db/schemas";
import { Lock, User } from "lucide-react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      pwd: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    try {
      const res = await axios.post(`api/users/${data.username}`, data);
      if (res.status === 200) {
        toast("Logged in successfully.")
        router.push(`/${res.data.username}`)
      };
      if (res.status === 404) {
        toast("User Not Found")
        router.refresh()
      };
      if (res.status === 401) {
        toast("Incorrect Password")
        router.refresh()
      };
    } catch (error) {
      router.push("login");
    }
  }

  const { isValid, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full relative">
              <User className="absolute top-4 left-3 size-6 text-muted-foreground" />
              <FormControl>
                <Input placeholder="Username" {...field} className="pl-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pwd"
          render={({ field }) => (
            <FormItem className="w-full relative">
              <Lock className="absolute top-4 left-3 size-6 text-muted-foreground" />
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  type="password"
                  className="pl-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login Now"}
        </Button>
      </form>
    </Form>
  );
}
