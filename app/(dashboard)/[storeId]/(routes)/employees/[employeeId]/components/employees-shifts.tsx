// "use client";

// import * as React from "react";
// import { amHours } from "@/public/hours";
// import { pmHours } from "@/public/hours";
// import { CalendarIcon } from "lucide-react";
// import { addDays, format } from "date-fns";
// import { DateRange } from "react-day-picker";
// import prismadb from "@/lib/prismadb";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export function EmployeeHours({
//   className,
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const [date, setDate] = React.useState<DateRange | undefined>({
//     from: new Date(2022, 0, 20),
//     to: addDays(new Date(2022, 0, 20), 20),
//   });

// const date = new Date('1983-11-29T06:00:08.080Z');

// // Convert to PDT
// const pdtDate = date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

// console.log(pdtDate);

//   return (
//     <>
//       <div className={cn("grid gap-2", className)}>
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               id="date"
//               variant={"outline"}
//               className={cn(
//                 "w-[300px] justify-start text-left font-normal",
//                 !date && "text-muted-foreground"
//               )}
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {date?.from ? (
//                 date.to ? (
//                   <>
//                     {format(date.from, "LLL dd, y")} -{" "}
//                     {format(date.to, "LLL dd, y")}
//                   </>
//                 ) : (
//                   format(date.from, "LLL dd, y")
//                 )
//               ) : (
//                 <span>Pick a date</span>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0" align="start">
//             <Calendar
//               initialFocus
//               mode="range"
//               defaultMonth={date?.from}
//               selected={date}
//               onSelect={setDate}
//               numberOfMonths={2}
//             />
//           </PopoverContent>
//         </Popover>
//       </div>
//       <Select>
//         <SelectTrigger className="w-[280px]">
//           <SelectValue placeholder="Select a timezone" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             {amHours.map((hour) => (
//               <SelectItem key={hour.hourNum} value={hour.hourNum}>
//                 {hour.hourLabel}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//     </>
//   );
// }

// /* END TIME
//             <FormField
//               control={form.control}
//               name="endTime"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>End Time</FormLabel>
//                   <Select
//                     onValueChange={(value) => field.onChange(parseInt(value)) }
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select shift end time." />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectGroup>
//                         {hours.map((hour) => (
//                           <SelectItem key={hour.hour} value={hour.hour}>
//                             {hour.label}
//                           </SelectItem>
//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//       </div>
//     </> */
