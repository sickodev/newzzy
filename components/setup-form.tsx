"use client";
import { EnvelopeClosedIcon, FileIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "./loading";
import { Switch } from "./ui/switch";
import { CardContent, CardFooter } from "./ui/card";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

const SetupForm = ({ userId }: { userId: string | undefined }) => {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        setMounted(true);
    }, []);
    const formSchema = z.object({
        newsletter: z.boolean().default(false),
        conditions: z.boolean(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            conditions: true,
            newsletter: false,
        },
    });

    if (!userId) {
        redirectToSignIn();
    }
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (!data.conditions.valueOf()) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something is wrong.",
                description: "Please accept the conditions to continue.",
            });
            return;
        }
        if (data.newsletter.valueOf()) {
            toast({
                title: "Newsletter Options",
                description: "Added you to the newsletter list.",
            });
        }

        try {
            const result = await axios.patch("/api/setup", {
                id: userId,
                subscribed: data.newsletter.valueOf(),
                agreed: data.conditions.valueOf(),
            });
            if (result) {
                toast({
                    description: "Finished setting up your profile.",
                });
                setTimeout(() => {
                    router.refresh();
                }, 2000);
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: error.message,
            });
        }
    };

    if (!mounted) {
        return (
            <CardContent>
                <Loading />
            </CardContent>
        );
    }
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-2'
                >
                    <CardContent>
                        <FormField
                            control={form.control}
                            name='newsletter'
                            render={({ field }) => (
                                <FormItem className='grid grid-cols-5 items-center'>
                                    <EnvelopeClosedIcon className='w-5 h-5' />
                                    <div className='col-span-3 space-y-1'>
                                        <FormLabel className='text-base'>
                                            Newsletter
                                        </FormLabel>
                                        <FormDescription className=' flex-wrap'>
                                            Want your weekly dose of Newzzy in
                                            your inbox?
                                        </FormDescription>
                                    </div>
                                    <FormControl className=''>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='conditions'
                            render={({ field }) => (
                                <FormItem className='grid grid-cols-5 items-center'>
                                    <FileIcon className='w-5 h-5' />
                                    <div className='col-span-3 space-y-1'>
                                        <FormLabel className='text-base'>
                                            Terms and Conditions
                                        </FormLabel>
                                        <FormDescription className=' flex-wrap'>
                                            Do you accept our{" "}
                                            <Link
                                                href={"/terms"}
                                                className='underline'
                                            >
                                                terms and conditions?
                                            </Link>
                                        </FormDescription>
                                    </div>
                                    <FormControl className=''>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                        <Button variant='outline' className='w-[200px]'>
                            Cancel
                        </Button>
                        <Button className='w-[200px]' type='submit'>
                            Submit
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </div>
    );
};

export default SetupForm;
