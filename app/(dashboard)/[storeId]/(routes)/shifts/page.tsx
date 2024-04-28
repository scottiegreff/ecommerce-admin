import prismadb from "@/lib/prismadb";
import { EmployeeColumn } from "./components/columns";
import { EmployeesClient } from "./components/client";
import { ScheduleClient } from "./components/scheduleClient";

import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

const EmployeePage = async ({ params }: { params: { storeId: string } }) => {
  const employees = await prismadb.employee.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedEmployee: EmployeeColumn[] = employees.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    employeeId: item.id,
    isActive: item.isActive,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  const hours = await prismadb.shift.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      employee: {
        select: {
          name: true,
          color: true,
        },
      },
      store: {
        select: {
          openTime: true,
          closeTime: true,
        },
      },
    },
  });


  return (
    <>
  
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ScheduleClient data={hours} />{" "}
      </div>
      <Separator />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeesClient data={formattedEmployee}/>{" "}
      </div>
    </>
  );
};

export default EmployeePage;
