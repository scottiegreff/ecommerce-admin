import { ColumnDef } from "@tanstack/react-table";

// export type ScheduleColumn = {
//   name: string;
//   day: string;
//   [hour: string]: string; // Dynamic keys for each hour
// };

// const getStoreScheduleColumns = async (storeId: string): Promise<ColumnDef<ScheduleColumn>[]> => {
//   try {
//     const store = await prismadb.store.findUnique({
//       where: {
//         id: storeId,
//       },
//     });

//     if (!store) {
//       throw new Error("Store not found");
//     }

//     const openTime = store.openTime;
//     const closeTime = store.closeTime;

// export type EmployeeShiftsColumn = {
//   name: string;
//   daysOfWork: String[];
//   startTime: Number;
//   endTime: Number;
// };

// export const employeeShiftsColumn: ColumnDef<EmployeeShiftsColumn>[] = [
//       {
//         accessorKey: "name",
//         header: "Name",
//       },
//       {
//         accessorKey: "startTime",
//         header: "Start Time",
    
//       },
//       {
//         accessorKey: "endTime",
//         header: "End Time",
//       },
//       {
//         accessorKey: "daysOfWork",
//         header: "Day",
//       },
//     ];

//     for (let i = openTime; i <= closeTime; i += 60) { // Increment by 60 minutes (1 hour)
//       const hour = i / 60; // Convert minutes to hours
//       scheduleColumn.push({
//         accessorKey: `${hour}`,
//         header: `${hour}:00`,
//       });
//     }

//     return scheduleColumn;
//   } catch (error) {
//     console.error("Error fetching store:", error);
//     throw error;
//   }
// };
