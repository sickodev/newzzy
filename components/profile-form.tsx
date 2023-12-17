"use client";
import { BellIcon } from "@radix-ui/react-icons";
import React from "react";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
    subscribed: z.boolean().optional(),
});
const ProfileForm = ({ subscribed }: { subscribed: boolean | undefined }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subscribed: true,
        },
    });

    const { toast } = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (values.subscribed) {
            toast({
                description: "Turned on Newsletter",
            });
        } else {
            toast({
                description: "Turned off Newsletter",
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='p-4 border rounded-xl flex items-center justify-between'
            >
                <div>
                    <BellIcon className='h-5 w-5' />
                </div>
                <div>
                    <Label>Newsletter</Label>
                    <p className='text-sm font-light'>
                        Want your weekly dose of Newzzy in your inbox?
                    </p>
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name='subscribed'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Switch
                                        type='submit'
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
};

export default ProfileForm;
