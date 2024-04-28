import prismadb from "@/lib/prismadb";

import { ShiftForm } from "./components/shift-form";

const EmployeePage = async ({
  params,
}: {
  params: { employeeId: string; storeId: string };
}) => {


  const shifts = await prismadb.shift.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      employee: {
        select: {
          name: true,
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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ShiftForm initialData={shifts} />
      </div>
    </div>
  );
};

export default EmployeePage;  
