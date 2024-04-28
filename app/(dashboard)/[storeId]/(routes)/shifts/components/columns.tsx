"use client";

import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ta } from "date-fns/locale";
import { table } from "console";
import { effect } from "zod";

export type EmployeeColumn = { 
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  isActive: boolean;
};

export const columns: ColumnDef<EmployeeColumn>[] = [
  {
    id: "select",
   
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
