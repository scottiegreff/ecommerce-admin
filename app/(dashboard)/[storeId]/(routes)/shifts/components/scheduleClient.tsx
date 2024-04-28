"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

type Shifts = {
  id: string;
  storeId: string;
  employeeId: string;
  from: Date;
  to: Date;
  startTime: number;
  endTime: number;
  store: {
    openTime: number;
    closeTime: number;
  };
  employee: {
    name: string;
    color: string;
  };
};

interface ScheduleClientProps {
  data: Shifts[];
}

export const ScheduleClient: React.FC<ScheduleClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const getStoreShiftsArr: number[] = [];
  let openTime = data[0]?.store.openTime;
  const closeTime = data[0]?.store.closeTime;
  for (let i = openTime; i < closeTime; i = i + 100) {
    getStoreShiftsArr.push(i);
  }

  type TableData = {
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    shifts: number[] | undefined;
  }[];

  const columns = {
    name: "Employee",
    date: "Date",
    startTime: "Start Time",
    endTime: "End Time",
    shifts: getStoreShiftsArr,
  };
  const tableData: TableData = [];

  //  START OF GETTING ALL DATES THAT AN EMPLOYEE WORKS *********************************************
  const getDatesBetweenTwoDates = (startDate: Date, endDate: Date): Date[] => {
    let currentDate = new Date(startDate);
    const getAllDates: Date[] = [];
    while (currentDate <= endDate) {
      getAllDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return getAllDates;
  };
  function getEmployeeShiftsOnDate(date: Date, id: string) {
    const employeeShiftsOnDate: number[] = [];
    data.map((item: Shifts) => {
      if (item.id === id) {
        const startTime = item.startTime;
        const endTime = item.endTime;
        for (let i = startTime; i < endTime; i += 100) {
          employeeShiftsOnDate.push(i);
        }
      }
    });
    return employeeShiftsOnDate;
  }

  type Row = {
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    shifts: number[];
  };
  const rows: Row = {
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    shifts: [],
  };
  const getRows = () => {
    let dates: Date[] = [];
    data.map((item: Shifts) => {
      dates = getDatesBetweenTwoDates(item?.from, item?.to);
      // console.log("date", dates)
      for (let i = 0; i < dates.length; i++) {
        const row: Row = {
          name: item.employee.name,
          date: formatDate(dates[i]),
          startTime: item.startTime + "",
          endTime: item.endTime + "",
          shifts: getEmployeeShiftsOnDate(dates[i], item.id), // Assign an empty array if shifts is undefined
        };
        tableData.push(row);
      }
    });
  };

  getRows();
  console.log("tableData", data[0]?.employee?.color);
  function formatDate(date: Date) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${dayNames[date.getDay()]} ${monthNames[date.getMonth()]} ${String(
      date.getDate()
    ).padStart(2, "0")}`;
  }

  // Calculate number of columns based on items length
  const storeShifts = data[0]?.store;
  const numColumns: number =
    (storeShifts?.closeTime - storeShifts?.openTime) / 100 + 2;

  return (
    <>
      {/* Employees Edit Shifts */}
      <div className="flex items-center justify-between">
        <Heading title={"Employees Schedules"} description="Manage Shifts" />
      </div>
      <Separator />

      <div className="grid grid-cols-12 md:w-[95vw] py-3 m-auto text-sm text-md md:text-lg border-b font-semibold border-black">
        <div className="p-1 border-black border-e">{columns.name}</div>
        <div className="p-1 border-black border-e">{columns.date}</div>
        <div className="p-1 border-black border-e">{columns.startTime}</div>
        <div className="p-1 border-black border-e">{columns.endTime}</div>

        {columns.shifts.map((item, index) => (
          <div className="p-1 border-black border-e" key={index}>
            {item}
          </div>
        ))}
      </div>

      {tableData?.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-12 md:w-[95vw] py-1 m-auto text-sm text-md md:text-md border-b border-black"
        >
          <div className="p-1 border-black border-e font-semibold">
            {item.name}
          </div>
          <div className="p-1 border-black border-e">{item.date}</div>
          <div className="p-1 border-black border-e">{item.startTime}</div>
          <div className="p-1 border-black border-e">{item.endTime}</div>

          {getStoreShiftsArr.map((storeShift, idx) => (
            <div
              key={idx}
              onClick={() => alert(item.date)}
              className={`border-e border-black ${
                item.shifts?.includes(storeShift)
                  ? "rounded-2xl p-1 my-1 mx-[.1rem] border border-black hover:bg-green-100 hover:scale-110 transition-transform duration-500"
                  : ""
              }`}
            >
              {item.shifts?.includes(storeShift) ? storeShift : ""}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
