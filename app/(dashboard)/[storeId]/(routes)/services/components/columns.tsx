"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ServiceColumn = {
  id: string
  name: string;
  time: Number;
  price: string;
  category: string;
 
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}

export const columns: ColumnDef<ServiceColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
