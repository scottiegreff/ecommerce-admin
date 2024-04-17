"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { amHours } from "@/public/hours";
import { pmHours } from "@/public/hours";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useStoreModal } from "@/hooks/use-store-modal";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fi } from "date-fns/locale";

const formSchema = z.object({
  name: z.string().min(1),
  openTime: z.string().min(1),
  closeTime: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      openTime: "",
      closeTime: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const { openTime } = values;
      setLoading(true);
      if (values.openTime <= values.closeTime) {
        toast.error("Closing time must be after opening time");
        return;
      }

      const response = await axios.post("/api/stores", values);
      // Refreshes the page and redirects to the store page

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Enter your store's name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h3 className="font-bold mt-10 mb-5 text-[1.05rem]">
                  Hours of Operation
                </h3>
                <FormField
                  control={form.control}
                  name="openTime"
                  render={({ field }) => (
                    <FormItem>
                      {/* (value) => field.onChange(parseInt(value)) */}
                      <FormLabel>Opening Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select an opening time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="SelectContent w-[250px] h-[300px]">
                          <SelectGroup>
                            <SelectLabel>AM</SelectLabel>
                            {amHours.map((hour) => (
                              <SelectItem
                                key={hour.hourNum}
                                value={hour.hourNum.toString()}
                              >
                                {hour.hourLabel}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup className="border-t border-slate-950 mt-4 pt-4">
                            <SelectLabel>PM</SelectLabel>
                            {pmHours.map((hour) => (
                              <SelectItem
                                key={hour.hourNum}
                                value={hour.hourNum.toString()}
                              >
                                {hour.hourLabel}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="closeTime"
                  render={({ field }) => (
                    <FormItem>
                      {/* (value) => field.onChange(parseInt(value)) */}
                      <FormLabel>Closing Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select an closing time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="SelectContent w-[250px] h-[300px]">
                          <SelectGroup>
                            <SelectLabel>AM</SelectLabel>
                            {pmHours.map((hour) => (
                              <SelectItem
                                key={hour.hourNum}
                                value={hour.hourNum.toString()}
                              >
                                {hour.hourLabel}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup className="border-t border-slate-950 mt-4 pt-4">
                            <SelectLabel>PM</SelectLabel>
                            {pmHours.map((hour) => (
                              <SelectItem
                                key={hour.hourNum}
                                value={hour.hourNum.toString()}
                              >
                                {hour.hourLabel}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={storeModal.onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
