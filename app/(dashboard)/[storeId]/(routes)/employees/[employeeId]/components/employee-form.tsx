"use client";

import * as z from "zod";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Employee } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

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
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Checkbox } from "@/components/ui/checkbox";



const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  isActive: z.boolean().default(true),
});

type EmployeeFormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
  initialData: Employee | null;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit staff" : "Create staff";
  const description = initialData ? "Edit a staff." : "Add a new staff";
  const toastMessage = initialData ? "Staff updated." : "Staff created.";
  const action = initialData ? "Save changes" : "Create";

  // CONSOLE LOGGING
  console.log("INITIAL DATA FROM FORM", initialData);
  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: "",
        email: "",
        phone: "",
      };

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    ...defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // let fromDateHour = date?.from?.getHours();
    // let toDateHour = date?.to?.getHours();
    // const startDate = date?.from?.setHours(data.startTime) as unknown as Date;
    // const endDate: Date = date?.to?.setHours(data.endTime) as unknown as Date;;
    console.log("DATA FROM FORM", data);

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
      {/* FORM */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* NAME */}
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
            {/* EMAIL */}
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
            {/* PHONE */}
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

            {/* ACTIVE */}
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
          <Separator />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
