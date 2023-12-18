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
import axios from "axios";

const formSchema = z.object({
    subscribed: z.boolean().optional(),
});
const ProfileForm = ({ profile }: { profile: Profile | null }) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subscribed: true,
        },
    });

    const { toast } = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        alert(values.subscribed?.valueOf());
        try {
            const response = await axios.patch("/api/setup", {
                id: profile?.id,
                subscribed: values.subscribed?.valueOf(),
                agreed: profile?.agreed.valueOf(),
            });

            if (response) {
                toast({
                    title: "Newsletter Settings",
                    description: `Changed newsletter settings to ${values.subscribed?.valueOf()}.`,
                });
            }
        } catch (error: any) {
            if (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                });
            }
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
