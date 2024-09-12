"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupFormSchema } from "@/lib/db/schemas";
import { Lock, User } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SignUp() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      pwd: "",
      confPwd: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SignupFormSchema>) {
    try {
      const res = await axios.post(`/api/users`, data);
      toast.success("Account created successfully");
      router.push("/");
    } catch (error) {
      console.error("Signup error", error);
      toast.success("Signup error");
      router.refresh();
    }
  };

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
        <FormField
          control={form.control}
          name="confPwd"
          render={({ field }) => (
            <FormItem className="w-full relative">
              <Lock className="absolute top-4 left-3 size-6 text-muted-foreground" />
              <FormControl>
                <Input
                  placeholder="Confirm Password"
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
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
