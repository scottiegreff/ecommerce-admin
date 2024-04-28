"use client";

import * as z from "zod";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Employee, Shift } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ShiftData = {
  id: string | undefined;
  employeeId: string | undefined;
  storeId: string | undefined;
  to: Date | undefined;
  from: Date | undefined;
  startTime: number | undefined;
  endTime: number | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  employee: { name: string | undefined };
  store: { openTime: number | undefined; closeTime: number | undefined };
};

const formSchema = z.object({
  employeeId: z.string().nonempty(),
  storeId: z.string().nonempty(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  startTime: z.coerce.number().min(1),
  endTime: z.coerce.number().min(1),
});

type EmployeeFormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
  initialData: ShiftData[] | null;
}

export const ShiftForm: React.FC<EmployeeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { shiftId, storeId } = useParams();

  const employeeIdShifts =
    initialData?.filter((shift) => shift.employeeId === shiftId) ?? [];

  const initialFormData = employeeIdShifts?.map((shift) => ({
    employeeId: shift.employeeId || undefined,
    storeId: shift.storeId || undefined,
    from: shift.from || undefined,
    to: shift.to || undefined,
    startTime: shift.startTime || undefined,
    endTime: shift.endTime || undefined,
  }));

  const createShiftTitle = `Create Shift for ${employeeIdShifts[0]?.employee?.name}`;
  const createShiftDescription = `Add a new shift to employee's schedule`;
  const editShiftTitle = `Edit ${employeeIdShifts[0]?.employee?.name}'s Shift`;
  const editShiftDescription = `Edit an employee's shift.`;

  const toastMessage = initialData ? "Staff updated." : "Staff created.";
  const editShiftAction = initialData ? "Save changes" : "Create";
  const createAction = "Create Shift";
  
  const createShiftForm = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: shiftId,
      storeId: storeId,
      from: new Date(),
      to: addDays(new Date(), 1),
      startTime: initialData?.[0]?.store?.openTime ?? 0,
      endTime: initialData?.[0]?.store?.closeTime ?? 2400
    },
  });

  const editShiftForm = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: shiftId,
      storeId: storeId,
      from: new Date(),
      to: addDays(new Date(), 1),
      startTime: initialData?.[0]?.store?.openTime ?? 0,
      endTime: initialData?.[0]?.store?.closeTime ?? 2400
    },
  });

  const onSubmitCreate = async (data: z.infer<typeof formSchema>) => {
    console.log("DATA FROM CREATE SHIFT ", data);
    try {
      setLoading(true);
      console.log("POSTING");
      await axios.post(`/api/${params.storeId}/shift/${shiftId}`, data);
      router.refresh();
      router.push(`/${params.storeId}/shifts`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitEdit = async (data: z.infer<typeof formSchema>) => {
    console.log("DATA FROM EDIT FORM", data);
    try {
      setLoading(true);
      if (initialData) {
        console.log("PATCHING");
        await axios.patch(
          `/api/${params.storeId}/employees/${params.employeeId}`,
          data
        );
      } else {
        console.log("POSTING");
        await axios.post(`/api/${params.storeId}/shift/${shiftId}`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/shifts`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteCreate = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/employees/${params.employeeId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/shifts`);
      toast.success("Employee deleted.");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onDeleteEdit = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/employees/${params.employeeId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/employees`);
      toast.success("Employee deleted.");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDeleteEdit}
        loading={loading}
      />


      <div className="">
        <div className="flex items-center justify-between">
          <Heading
            title={createShiftTitle}
            description={createShiftDescription}
          />
        </div>
        <Form {...createShiftForm}>
          <form
            onSubmit={createShiftForm.handleSubmit(onSubmitCreate)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-2 gap-8 py-10">
              <FormField
                control={createShiftForm.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>START of Shift Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={loading}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createShiftForm.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>END of Shift Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={loading}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createShiftForm.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={100}
                        min={initialData?.[0]?.store?.openTime ?? 0}
                        max={initialData?.[0]?.store?.closeTime ?? 2400}
                        disabled={loading}
                        placeholder="000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createShiftForm.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={100}
                        min={initialData?.[0]?.store?.openTime ?? 0}
                        max={initialData?.[0]?.store?.closeTime ?? 2400}
                        disabled={loading}
                        placeholder="000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-5 flex justify-end">
              <Button type="submit" disabled={loading}>
                {createAction}
              </Button>
            </div>
          </form>
        </Form>
        <Separator />
        <div className="py-10 flex items-center justify-between">
          <Heading title={editShiftTitle} description={editShiftDescription} />
          {initialData && (
            <Button
              disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="mb-5">
        <Form {...editShiftForm}>
          <form
            onSubmit={editShiftForm.handleSubmit(onSubmitEdit)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-2 gap-8 py-5">
              <FormField
                control={editShiftForm.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>START of Shift Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editShiftForm.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>END of Shift Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editShiftForm.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={100}
                        min={0}
                        max={2400}
                        disabled={loading}
                        placeholder="000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editShiftForm.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={100}
                        min={0}
                        max={2400}
                        disabled={loading}
                        placeholder="000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {editShiftAction}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
