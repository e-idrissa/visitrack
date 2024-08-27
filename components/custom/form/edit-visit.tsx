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
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { EditVisitFormSchema } from "@/lib/db/schemas";
import { Visit } from "@prisma/client";
import { Label } from "@/components/ui/label";

type Props = {
  visit: Visit
}

export function EditVisitForm({ visit }: Props) {
  const form = useForm<z.infer<typeof EditVisitFormSchema>>({
    resolver: zodResolver(EditVisitFormSchema),
    defaultValues: {
      name: visit.name,
      lastname: visit.lastName,
      reason: visit.reason,
      status: visit.status ? "inProgress" : "ended",
      startingHour: visit.entering_at.getHours(),
      startingMin: visit.entering_at.getMinutes(),
      endingHour: visit.leaving_at.getHours(),
      endingMin: visit.leaving_at.getMinutes(),
    },
  });

  function onSubmit(data: z.infer<typeof EditVisitFormSchema>) {
    console.log(data);
  }

  const { isValid, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 flex flex-col items-center"
      >
        <div className="flex items-center space-x-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full relative h-[3.3rem] flex items-end border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
                <Label className="absolute top-2 left-3 text-muted-foreground text-[#705fcc]">Name</Label>
                <FormControl className="">
                  <Input placeholder="Name" {...field} className="border-transparent"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="w-full relative h-[3.3rem] flex items-end border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
                <Label className="absolute top-2 left-3 text-muted-foreground text-[#705fcc]">Last Name</Label>
                <FormControl className="">
                  <Input placeholder="Last Name" {...field} className="border-transparent"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center space-x-6 w-full">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="w-full relative">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <Label className="absolute top-4 left-3 text-muted-foreground text-[#705fcc]">Reason</Label>
                  <FormControl>
                    <SelectTrigger className="h-[3.3rem] items-end">
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
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-4/5 relative">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <Label className="absolute top-4 left-3 text-muted-foreground text-[#705fcc]">Status</Label>
                  <FormControl>
                    <SelectTrigger className="h-[3.3rem] items-end">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="inProgress">In progress</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center space-x-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full relative h-[3.3rem] flex items-end border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
                <Label className="absolute top-2 left-3 text-muted-foreground text-[#705fcc]">Name</Label>
                <FormControl className="">
                  <Input placeholder="Name" {...field} className="border-transparent"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="w-full relative h-[3.3rem] flex items-end border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
                <Label className="absolute top-2 left-3 text-muted-foreground text-[#705fcc]">Last Name</Label>
                <FormControl className="">
                  <Input placeholder="Last Name" {...field} className="border-transparent"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={!isValid || isSubmitting} className="self-end">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
