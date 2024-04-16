"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import type { DateRange } from "react-day-picker";

export type ScheduleColumn = {
  name: string;
  day: string;
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
  seven: string;
  eight: string;
  nine: string;
  ten: string;
  eleven: string;
  twelve: string;
  thirteen: string;
  fourteen: string;
  fifteen: string;
  sixteen: string;
  seventeen: string;
  eighteen: string;
  nineteen: string;
  twenty: string;
  twentyone: string;
  twentytwo: string;
  twentythree: string;
  twentyfour: string;
};

// const columnsHours = [];
// for (let i = 0; i < 24; i++) {
//   columnsHours.push({
//     accessorKey: {},
//     header: {}
//   })
// }
export const scheduleColumn: ColumnDef<ScheduleColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "from",
    header: "Day",
  },
  { accessorKey: "startTime", header: "Start Time" },
  { accessorKey: "endTime", header: "End Time" },

  // {
  //   accessorKey: "twentyfour",
  //   header: "12:00 AM",
  // },
  // {
  //   accessorKey: "one",
  //   header: "1:00 AM",
  // },
  // {
  //   accessorKey: "two",
  //   header: "2:00 AM",
  // },
  // {
  //   accessorKey: "three",
  //   header: "3:00 AM",
  // },
  // {
  //   accessorKey: "four",
  //   header: "4:00 AM",
  // },
  // {
  //   accessorKey: "five",
  //   header: "5:00 AM",
  // },
  // {
  //   accessorKey: "six",
  //   header: "6:00 AM",
  // },
  // {
  //   accessorKey: "seven",
  //   header: "7:00 AM",
  // },
  {
    accessorKey: "eight",
    header: "8:00",
  },
  {
    accessorKey: "nine",
    header: "9:00",
  },
  {
    accessorKey: "ten",
    header: "10:00",
  },
  {
    accessorKey: "eleven",
    header: "11:00",
  },
  {
    accessorKey: "twelve",
    header: "12:00",
  },
  {
    accessorKey: "thirteen",
    header: "1:00",
  },
  {
    accessorKey: "fourteen",
    header: "2:00",
  },
  {
    accessorKey: "fifteen",
    header: "3:00",
  },
  {
    accessorKey: "sixteen",
    header: "4:00",
  },
  {
    accessorKey: "seventeen",
    header: "5:00",
  },
  {
    accessorKey: "eighteen",
    header: "6:00",
  },
  // {
  //   accessorKey: "nineteen",
  //   header: "7:00",
  // },
  // {
  //   accessorKey: "twenty",
  //   header: "8:00 PM",
  // },
  // {
  //   accessorKey: "twentyone",
  //   header: "9:00 PM",
  // },
  // {
  //   accessorKey: "twentytwo",
  //   header: "10:00 PM",
  // },
  // {
  //   accessorKey: "twentythree",
  //   header: "11:00 PM",
  // },
];
