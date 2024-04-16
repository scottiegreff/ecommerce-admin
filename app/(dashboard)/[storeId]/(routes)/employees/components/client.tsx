"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { EmployeeColumn, columns } from "./columns";
import { ScheduleColumn, scheduleColumn } from "./scheduleColumn";

interface EmployeesClientProps {
  data: EmployeeColumn[];
  shiftData: any;
}

export const EmployeesClient: React.FC<EmployeesClientProps> = ({
  data,
  shiftData,
}) => {
  const params = useParams();
  const router = useRouter();

  const employeeId = data[0]?.employeeId;

  return (
    <>
      {/* Employees Table & New Employee */}
      <div className="flex items-center justify-between">
        <Heading
          title={`Employees (${data.length})`}
          description="Manage employees"
        />
        <Button onClick={() => router.push(`/${params.storeId}/employees/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />

      {/* Employees Edit Shifts */}
      <Separator />
      <div className="flex items-center justify-between">
        <Heading
          title={"Employees Schedules"}
          description="Manage employees Shifts"
        />
        <Button
          onClick={() =>
            router.push(`/${params.storeId}/employees/${employeeId}/schedule`)
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Add a new Shift
        </Button>
      </div>
      <DataTable
        searchKey={"day" || "name"}
        columns={scheduleColumn}
        data={shiftData}
        className={"mt-4"}
      />
      <Separator />
       {/* <Heading title="API" description="API Calls for Employees" /> */}
      {/* <ApiList entityName="employees" entityIdName="employeeId" /> */}
    </>
  );
};
