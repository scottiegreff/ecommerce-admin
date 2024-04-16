import { ColumnDef } from "@tanstack/react-table";
import prismadb from "@/lib/prismadb";

export type ScheduleColumn = {
  name: string;
  day: string;
  [hour: string]: string; // Dynamic keys for each hour
};

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

export const scheduleColumn: ColumnDef<ScheduleColumn>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "day",
        header: "Day",
      },
    ];

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
