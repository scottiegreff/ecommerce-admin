import { DateRange } from "react-day-picker";
import { create } from "zustand";

interface useDateRangePickerInterface {
  date?: DateRange | undefined;
  setDate: (newDate: DateRange | undefined) => void;
}

export const useDateRangePicker = create<useDateRangePickerInterface>(
  (set) => ({
    date: undefined,
    setDate: (newDate ) => set({date: newDate}),
  })
);
