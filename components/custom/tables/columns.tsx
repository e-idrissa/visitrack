"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircleIcon,
  MoreHorizontal,
  ArrowUpDown,
  Trash2,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { EditVisit } from "../edit-visit";
import { cn } from "@/lib/utils";
import { Visit } from "@prisma/client";
import { GetVisit } from "@/lib/actions/visit.actions";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const columns: ColumnDef<Visit>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    size: 10,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "lastname",
    header: () => <div className="text-center">Last Name</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("lastname")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-center"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      const formatted = status ? "in progress" : "ended";

      return (
        <div className="text-left pl-4 capitalize font-medium">
          <Badge
            className={cn(
              "font-medium flex items-center justify-center w-fit",
              !status
                ? "bg-emerald-600/30 text-emerald-600"
                : "bg-[#9181f4]/30 text-[#9181f4]"
            )}
          >
            {formatted}
          </Badge>
        </div>
      );
    },
    size: 70,
  },
  {
    accessorKey: "entering_at",
    header: () => <div className="text-center">Enter At</div>,
    cell: ({ row }) => {
      const hour = new Date(row.getValue("entering_at")).getHours();
      const min = new Date(row.getValue("entering_at")).getMinutes();
      const formatted = `${hour}:${min}`;
      return <div className="text-center font-medium">{formatted}</div>;
    },
    size: 70,
  },
  {
    accessorKey: "leaving_at",
    header: () => <div className="text-center">Exit At</div>,
    cell: ({ row }) => {
      const hour = new Date(row.getValue("leaving_at")).getHours();
      const min = new Date(row.getValue("leaving_at")).getMinutes();
      const formatted = `${hour}:${min}`;
      return (
        <div className="text-center font-medium">
          {row.getValue("leaving_at") === null ? "--:--" : formatted}
        </div>
      );
    },
    size: 70,
  },
  {
    id: "edit",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <EditVisit visit={row.original} />
      </div>
    ),
    maxSize: 20,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const visit = row.original;
      const router = useRouter()
      const [isLoading, setIsLoading] = useState(false)

      const deleteVisit = async () => {
        const data = row.original
        setIsLoading(true)
        try {
          const res = await axios.delete(`/api/visits/${visit.id}`, { data })
          if (res.status === 200) {
            setIsLoading(false)
            toast.success("Visit deleted successfully");
            router.refresh()
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false)
          toast.error("Something went wrong");
        }
      }

      const endVisit = async () => {
        const data = row.original
        setIsLoading(true)
        try {
          const res = await axios.patch(`/api/visits/${visit.id}/end`, { data })
          if (res.status === 200) {
            setIsLoading(false)
            toast.success("Visit ended successfully");
            router.refresh()
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false)
          toast.error("Something went wrong");
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
              <span className="sr-only">Open menu</span>
              {!isLoading && <MoreHorizontal className="h-4 w-4" />}
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant="end" onClick={endVisit}>
                <CheckCircleIcon className="size-4 mr-1" />
                End
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="destructive" onClick={deleteVisit}>
                <Trash2 className="size-4 mr-1" />
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 50,
  },
];
