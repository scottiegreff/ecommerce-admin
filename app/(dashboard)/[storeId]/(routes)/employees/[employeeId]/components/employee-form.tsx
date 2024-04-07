"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Employee } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useDateRangePicker } from "@/hooks/use-date-range-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectScrollable } from "@/components/ui/scroll-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import { is } from "date-fns/locale";
import { set } from "date-fns";


const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  hours: z.array(z.string()),
  isActive: z.boolean().default(true),
});

type EmployeeFormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
  initialData: Employee | null
  // name: string;
  // email: string;
  // phone: string;
  // hours: string;
  // isActive: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  // name,
  // email,
  // phone,
  // hours,
  // isActive,
}) => {
  const params = useParams();
  const router = useRouter();
  const { date, setDate } = useDateRangePicker();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit staff" : "Create staff";
  const description = initialData ? "Edit a staff." : "Add a new staff";
  const toastMessage = initialData ? "Staff updated." : "Staff created.";
  const action = initialData ? "Save changes" : "Create";


  const defaultValues = initialData ? {
      ...initialData,
    } : {
        name: '',
        email: 'ad',
        phone: '',
        hours: [],
      };

  console.log("INITIAL VALUES", defaultValues)    
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      hours: defaultValues.hours.map((dateRange) => dateRange?.toString() ?? ""),
    },
  });
 
  const onSubmit = async (data: EmployeeFormValues) => {
    console.log("data DDDAAAAATTTTTAAAAA", data.hours);
    console.log("DATE: ", date?.from)
    const from = ""+date?.from
    const to = ""+date?.to
    const hours = `${from} , ${to}`
    const hoursArr = [];
    hoursArr.push(hours)
    data.hours = hoursArr

    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/employees/${params.employeeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/employees`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/employees`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
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
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
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
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Employee name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Employee email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Employee phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DatePickerWithRange/>
            <SelectScrollable label="START TIME OF WORK"/>
            <SelectScrollable label="END TIME OF WORK"/>

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      defaultChecked={true}
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Currently Active</FormLabel>
                    <FormDescription>
                      If the employee is currently working.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
