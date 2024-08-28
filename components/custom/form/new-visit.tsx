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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { NewVisitFormSchema } from "@/lib/db/schemas";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  username: string;
};

export function NewVisitForm({ username }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof NewVisitFormSchema>>({
    resolver: zodResolver(NewVisitFormSchema),
    defaultValues: {
      name: "",
      lastname: "",
      reason: "",
    },
  });

  async function onSubmit(data: z.infer<typeof NewVisitFormSchema>) {
    try {
      const res = await axios.post("api/visits", { data, username });
      if (res.status === 200) {
        toast.success("Visit created successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
      router.refresh();
    }
  }

  const { isValid, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col items-center"
      >
        <div className="flex items-center space-x-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem className="w-full">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="infos">Information</SelectItem>
                  <SelectItem value="visit">Visit</SelectItem>
                  <SelectItem value="rdv">Appointment</SelectItem>
                  <SelectItem value="consultance">Consultance</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="other">Other reason</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="self-end"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
