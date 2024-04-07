import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const amHours = [
  "12 am",
  "1 am",
  "2 am",
  "3 am",
  "4 am",
  "5 am",
  "6 am",
  "7 am",
  "8 am",
  "9 am",
  "10 am",
  "11 am",
]; 
const pmHours = [
  "12 pm",
  "1 pm",
  "2 pm",
  "3 pm",
  "4 pm",
  "5 pm",
  "6 pm",
  "7 pm",
  "8 pm",
  "9 pm",
  "10 pm",
  "11 pm",
];

export function SelectScrollable({label}: {label: string}) {

  return (
    <>
    <div className="flex flex-col justify-start gap-2">
    <label className="text-sm font-semibold text-gray-600">{label}</label>
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select Working Hours" />
      </SelectTrigger>
      <SelectContent
       className="max-h-[50vh] overflow-y-auto"
      >
        <SelectGroup>
          <SelectLabel className="text-red-500 my-1">MORNING</SelectLabel>
          <hr/>
          {amHours.map((hour) => (
            <SelectItem  key={hour} value={hour}>
              {hour}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <hr/>
          <SelectLabel className="text-red-500 my-1">AFTERNOON, EVENING & NIGHT</SelectLabel>
          <hr/>
          {pmHours.map((hour) => (
            <SelectItem key={hour} value={hour}>
              {hour}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    </>
  );
}
