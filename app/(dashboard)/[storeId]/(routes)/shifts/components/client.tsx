"use client";
import useEmployeeSelectionStore from "@/hooks/use-employee-selection-store";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { EmployeeColumn, columns } from "./columns";

type ShiftData = {
  id: string;
  employeeId: string;
  storeId: string;
  to: Date;
  from: Date;
  startTime: number;
  endTime: number;
  createdAt: Date;
  updatedAt: Date;
  employee: { name: string };
  store: { openTime: number; closeTime: number };
};

interface EmployeesClientProps {
  data: EmployeeColumn[];
  // shiftData: ShiftData[]; 
}

export const EmployeesClient: React.FC<EmployeesClientProps> = ({
  data,
  // shiftData,
}) => {
  const params = useParams();
  const router = useRouter();
  const employeeId = data[0]?.employeeId;

  const selectedRow = useEmployeeSelectionStore((state) => state.selectedRow);
  const employeeIdSelected = selectedRow?.employeeId;

  console.log(selectedRow);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Employees (${data.length})`}
          description="Manage employees"
        />

        <Button
          disabled={!employeeIdSelected}
          onClick={() => {
            router.push(`/${params.storeId}/shifts/${employeeIdSelected}`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />{" "}
          {employeeIdSelected
            ? `Create ${selectedRow.name}'s Shifts`
            : "Create Employee's Shift"}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
    </>
  );
};
