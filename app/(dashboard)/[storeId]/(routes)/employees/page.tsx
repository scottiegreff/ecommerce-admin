import prismadb from "@/lib/prismadb";
import { EmployeeColumn } from "./components/columns";
import { EmployeesClient } from "./components/client";
// import { EmployeeShiftsColumn } from "./components/scheduleColumns";
import { format } from "date-fns";

const EmployeePage = async ({ params }: { params: { storeId: string } }) => {
  // START OF THE EMPLOYEE SECTION ****************************************************************************

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

  // START OF THE SCHEDULE SECTION *****************************************************************************
  type Hours = {
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
  };

  const hours = await prismadb.hour.findMany({
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

  const getStoreHoursArr: number[] = [];
  let openTime = hours[0]?.store.openTime;
  const closeTime = hours[0]?.store.closeTime;
  for (let i = openTime; i < closeTime; i = i + 100) {
    getStoreHoursArr.push(i);
  }

  type TableData = {
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    hours: number[] | undefined;
  }[];

  const columns = {
    name: "Employee",
    date: "Date",
    startTime: "Start Time",
    endTime: "End Time",
    hours: getStoreHoursArr,
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
  function getEmployeeHoursOnDate(date: Date, id: string) {
    const employeeHoursOnDate: number[] = [];
    hours.map((item) => {
      if (item.id === id) {
        const startTime = item.startTime;
        const endTime = item.endTime;
        for (let i = startTime; i < endTime; i += 100) {
          employeeHoursOnDate.push(i);
        }
      }
    });
    return employeeHoursOnDate;
  }

  type Row = {
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    hours: number[];
  };
  const rows: Row = {
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    hours: [],
  };
  const getRows = () => {
    let dates: Date[] = [];
    hours.map((item) => {
      dates = getDatesBetweenTwoDates(item?.from, item?.to);
      // console.log("date", dates)
      for (let i = 0; i < dates.length; i++) {
        const row: Row = {
          name: item.employee.name,
          date: formatDate(dates[i]),
          startTime: item.startTime + "",
          endTime: item.endTime + "",
          hours: getEmployeeHoursOnDate(dates[i], item.id), // Assign an empty array if hours is undefined
        };
        tableData.push(row);
      }
    });
  };

  getRows();

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
  const storeHours = hours[0]?.store;
  const numColumns: number =
    (storeHours?.closeTime - storeHours?.openTime) / 100 + 2;

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeesClient data={formattedEmployee} />{" "}
      </div>
      <div className="grid grid-cols-12 md:w-[95vw] py-3 m-auto text-sm text-md md:text-lg border-b font-semibold border-black">
        <div className="p-1 border-black border-e">{columns.name}</div>
        <div className="p-1 border-black border-e">{columns.date}</div>
        <div className="p-1 border-black border-e">{columns.startTime}</div>
        <div className="p-1 border-black border-e">{columns.endTime}</div>

        {columns.hours.map((item, index) => (
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
          <div className="p-1 border-black border-e">{item.name}</div>
          <div className="p-1 border-black border-e">{item.date}</div>
          <div className="p-1 border-black border-e">{item.startTime}</div>
          <div className="p-1 border-black border-e">{item.endTime}</div>

          {getStoreHoursArr.map((storeHour, idx) => (
            <div
              key={idx}
              className={`border-e border-black ${
                item.hours?.includes(storeHour)
                  ? "bg-red-200 rounded-2xl p-1 my-1 mx-[.1rem] border border-black hover:bg-green-100 hover:scale-110 transition-transform duration-500"
                  : ""
              }`}
            >
              {item.hours?.includes(storeHour) ? storeHour : ""}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default EmployeePage;
