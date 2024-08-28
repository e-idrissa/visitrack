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
import { EditVisitFormSchema } from "@/lib/db/schemas";
import { Visit } from "@prisma/client";
import { Label } from "@/components/ui/label";

type Props = {
  visit: Visit;
};

export function EditVisitForm({ visit }: Props) {
  const form = useForm<z.infer<typeof EditVisitFormSchema>>({
    resolver: zodResolver(EditVisitFormSchema),
    defaultValues: {
      name: visit.name,
      lastname: visit.lastname,
      reason: visit.reason,
      status: visit.status ? "inProgress" : "ended",
      startingHour: visit.entering_at.getHours(),
      startingMin: visit.entering_at.getMinutes(),
      endingHour: visit.leaving_at!.getHours(),
      endingMin: visit.leaving_at!.getMinutes(),
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
        className="w-full space-y-6 flex flex-col items-center"
      >
        <div className="flex items-center space-x-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full relative border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
                <Label className="absolute text-[#705fcc] left-3 py-2 text-xs">
                  Name
                </Label>
                <FormControl className="pt-[1.75rem] pb-5">
                  <Input
                    placeholder="Name"
                    {...field}
                    className="border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="w-full relative border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
                <Label className="absolute text-[#705fcc] left-3 py-2 text-xs">
                  Last Name
                </Label>
                <FormControl className="pt-[1.75rem] pb-5">
                  <Input
                    placeholder="Last Name"
                    {...field}
                    className="border-transparent"
                  />
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
              <FormItem className="w-full relative border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
                <Label className="absolute text-[#705fcc] left-3 py-2 text-xs">
                  Reason
                </Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-transparent pt-[1.75rem] pb-5">
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
        </div>
        <div className="flex items-center space-x-6 w-full">
          <div className="flex relative items-center w-[70%] border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
            <Label className="absolute text-[#705fcc] left-3 py-2 top-0 text-xs">
              Started At
            </Label>
            <div className="w-it flex space-x-2">
              <div className="flex items-center w-fit pt-4">
                <FormField
                  control={form.control}
                  name="startingHour"
                  render={({ field }) => (
                    <FormItem className="w-fit rounded-md flex items-center justify-center">
                      <FormControl className="">
                        <Input
                          placeholder="HH"
                          {...field}
                          className="border-transparent text-center w-[3.2rem] px-0 pl-3 pr-1"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="text-primary">:</span>
                <FormField
                  control={form.control}
                  name="startingMin"
                  render={({ field }) => (
                    <FormItem className="w-fit rounded-md flex items-center justify-center">
                      <FormControl className="">
                        <Input
                          placeholder="MM"
                          {...field}
                          className="border-transparent text-center w-[3.2rem] px-0 pl-3 pr-1"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex relative items-center w-[70%] border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
            <Label className="absolute text-[#705fcc] left-3 py-2 top-0 text-xs">
              Ended At
            </Label>
            <div className="w-it flex space-x-2">
              <div className="flex items-center w-fit pt-4">
                <FormField
                  control={form.control}
                  name="endingHour"
                  render={({ field }) => (
                    <FormItem className="w-fit rounded-md flex items-center justify-center">
                      <FormControl className="">
                        <Input
                          placeholder="HH"
                          {...field}
                          className="border-transparent text-center w-[3.2rem] px-0 pl-3 pr-1"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="text-primary">:</span>
                <FormField
                  control={form.control}
                  name="endingMin"
                  render={({ field }) => (
                    <FormItem className="w-fit rounded-md flex items-center justify-center">
                      <FormControl className="">
                        <Input
                          placeholder="MM"
                          {...field}
                          className="border-transparent text-center w-[3.2rem] px-0 pl-3 pr-1"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full relative border border-[#E1E1E1] bg-[#F0EDFF] rounded-md">
                <Label className="absolute text-[#705fcc] left-3 py-2 text-xs">
                  Status
                </Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-transparent pt-[1.75rem] pb-5">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="inProgress">In Progress</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
