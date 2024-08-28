"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircleIcon,
  Edit3,
  MoreHorizontal,
  ArrowUpDown,
  Trash2,
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
      return (
        <div className="text-center font-medium">{formatted}</div>
      );
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
        <div className="text-center font-medium">{row.getValue("leaving_at") === null ? "--:--" : formatted}</div>
      );
    },
    size: 70,
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex justify-end">
          <EditVisit visit={row.original}/>
        </div>
      );
    },
    maxSize: 20,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant="end">
                <CheckCircleIcon className="size-4 mr-1" />
                End
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="destructive">
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
