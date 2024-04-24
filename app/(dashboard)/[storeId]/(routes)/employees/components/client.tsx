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
// import { EmployeeShiftsColumn, employeeShiftsColumn } from "./scheduleColumns";
// import { ScheduleColumn, scheduleColumn } from "./scheduleColumn";
// import { employeeShiftsColumn, EmployeeShifts  } from "./scheduleColumns";

interface EmployeesClientProps {
  data: EmployeeColumn[];
  // shiftData: EmployeeShiftsColumn[];
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
      {/* Employees Table & New Employee */}
      <div className="flex items-center justify-between">
        <Heading
          title={`Employees (${data.length})`}
          description="Manage employees"
        />
        <Button onClick={() => router.push(`/${params.storeId}/employees/${employeeIdSelected}`)}>
          <Plus className="mr-2 h-4 w-4" /> {employeeIdSelected ? `Edit ${selectedRow.name}'s Shifts` : "New Employee"}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      

      {/* Employees Edit Shifts */}
      <Separator />
      {/* <div className="flex items-center justify-between">
        <Heading title={"Employees Schedules"} description="Manage Shifts" />
        <div className="flex flex-col">
          <Button
            className="w-min-40"
            onClick={() =>
              router.push(`/${params.storeId}/employees/${employeeId}/schedule`)
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add/Update Shift
          </Button>
          <p className="text-sm text-gray-500 mt-1">
            Copy the Employees ID above to edit their shifts
          </p>
        </div>
      </div> */}
       {/* <DataTable
        searchKey={"day" || "name"}
        columns={employeeShiftsColumn}
        data={shiftData}
        className={"mt-4"}
      />  */}
      {/* <Separator /> */}
      {/* <Heading title="API" description="API Calls for Employees" /> */}
      {/* <ApiList entityName="employees" entityIdName="employeeId" /> */}
    </>
  );
};
