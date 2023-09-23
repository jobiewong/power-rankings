import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  foregroundColour: z.string().regex(/^#[0-9a-f]{6}$/i),
  backgroundColour: z.string().regex(/^#[0-9a-f]{6}$/i),
  region: z.string().min(3).max(255),
});

function NewTeamForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="foregroundColour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Colour</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="backgroundColour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background Colour</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <div className="space-y-2">
          <FormLabel>Logo</FormLabel>
          <Input type="file" />
        </div>
        <div className="space-y-2 border p-2 shadow-sm">
          <p className="text-lg font-semibold">Preview</p>
          <div className="flex">
            <div className="pointer-events-none aspect-square h-full" />
            <div className="flex w-full">
              <div className="aspect-square h-full bg-red-500" />
              <div className="w-full bg-slate-200 p-4">placeholder</div>
            </div>
          </div>
        </div>
        <Button type="submit" className="bg-platchat-primary font-semibold">
          Add Team
        </Button>
      </form>
    </Form>
  );
}

export default NewTeamForm;
