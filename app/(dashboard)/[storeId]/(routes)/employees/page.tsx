import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { EmployeesClient } from "./components/client";
import { EmployeeColumn } from "./components/columns";
import { EmployeesShifts } from "./[employeeId]/components/employees-shifts";
import { EmployeeHours } from "@/types/employeeHours";

const EmployeePage = async ({ params }: { params: { storeId: string } }) => {
  const employee = await prismadb.employee.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log("EMPLOYEE FROM DB IN OUTER PAGE: ",employee);

  const formattedEmployee: EmployeeColumn[] = employee.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    employeeId: item.id,
    isActive: item.isActive,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  // console.log("FORMATTED EMPLOYEE: ", formattedEmployee);

  const employeeHours: EmployeeHours[] = employee.map((item) => ({
    id: item.id,
    name: item.name,
    hours: item.hours,
  }));
  // console.log("EMPLOYEE HOURS: ", employeeHours);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeesClient data={formattedEmployee} />
        {/* <EmployeesShifts data={employeeHours} /> */}
      </div>
    </div>
  );
};

export default EmployeePage;
