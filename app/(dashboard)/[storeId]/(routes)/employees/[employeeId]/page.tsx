import prismadb from "@/lib/prismadb";

import { EmployeeForm } from "./components/employee-form";

const EmployeePage = async ({
  params,
}: {
  params: { employeeId: string; storeId: string };
}) => {
  const employee = await prismadb.employee.findUnique({
    where: {
      id: params.employeeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeeForm initialData={employee} />
        {/* <div className="flex-1 space-y-4 p-8 pt-6">asdffsadfasfasf</div> */}
      </div>
    </div>
  );
};

export default EmployeePage;

// const newEvent = await prisma.event.create({
//   data: {
//     name: "Annual Conference",
//     description: "A yearly gathering for professionals.",
//     dates: [
//       new Date("2024-05-20T09:00:00Z"),
//       new Date("2024-05-21T09:00:00Z"),
//     ],
//   },
// });

// const updateEvent = await prisma.event.update({
//   where: { id: 1 },
//   data: {
//     dates: {
//       push: new Date("2024-05-22T09:00:00Z"),
//     },
//   },
// });
