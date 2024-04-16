import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { EmployeesClient } from "./components/client";
import { EmployeeColumn } from "./components/columns";
import { ScheduleColumn } from "./components/scheduleColumn";

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

  const schedule = await prismadb.hour.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      employee: {
        select: {
          name: true,
        },
      },
    },
  });

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

  const employeeShifts = schedule.map((item) => ({
    id: item.id,
    name: item.employee.name,
    from: item.from,
    to: item.to,
    startTime: item.startTime,
    endTime: item.endTime,
  }));
  console.log("EMPLOYEE Shifts: ", employeeShifts);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
  const shiftData = employeeShifts.map((item) => ({
    id: item.id,
    name: item.name,
    from: `${monthNames[item.from.getMonth()]} ${String(item.from.getDate()+1).padStart(2, '0')}`,
    to: `${monthNames[item.to.getMonth()]} ${String(item.to.getDate()).padStart(2, '0')}`,
    startTime: item.startTime,
    endTime: item.endTime,
  }));
  console.log("Shift Data: ", shiftData);
  // employeeShifts.map((item) => {
  //   // change the format of the date to be more readable
  //   const from = new Date(item.from);
  //   const to = new Date(item.to);
   
  //   const formattedDate = `${monthNames[from.getMonth()]} ${String(from.getDate()).padStart(2, '0')}`;
  // });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeesClient data={formattedEmployee} shiftData={shiftData} />
      </div>
    </div>
  );
};

export default EmployeePage;
