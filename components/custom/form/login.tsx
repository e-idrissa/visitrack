"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/lib/schemas";
import { Lock, User } from "lucide-react";

export function Login() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      pwd: "",
    },
  });

  function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    console.log(data);
  }

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
                <Input placeholder="Password" {...field} type="password" className="pl-10" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login Now</Button>
      </form>
    </Form>
  );
}
