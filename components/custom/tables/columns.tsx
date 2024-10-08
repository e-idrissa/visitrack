"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { EditVisit } from "../edit-visit";
import { cn, dateFormat } from "@/lib/utils";
import { Visit } from "@prisma/client";
import RowActions from "./row-actions";

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
      const formatted = dateFormat(row.getValue("entering_at"));
      return <div className="text-center font-medium">{formatted}</div>;
    },
    size: 150,
  },
  {
    accessorKey: "leaving_at",
    header: () => <div className="text-center">Exit At</div>,
    cell: ({ row }) => {
      const formatted = dateFormat(row.getValue("leaving_at"));
      return <div className="text-center font-medium">{formatted}</div>;
    },
    size: 150,
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
    cell: ({ row }) => <RowActions visit={row.original} />, // Use RowActions component
    size: 50,
  },
];
