import ProfileForm from "@/components/profile-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { BellIcon, FileIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Profile = async () => {
    const user = await currentUser();

    const profile: Profile | null = await db.profile.findFirst({
        where: {
            userId: user?.id,
        },
    });
    return (
        <main>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'>Your Profile</CardTitle>
                    <CardDescription>
                        Edit or view your profile settings here
                    </CardDescription>
                    <hr />
                    <CardContent>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col space-y-2'>
                                <div className=' gap-2'>
                                    <Label>Name</Label>
                                    <div className='rounded border px-2 w-[400px] lg:w-[800px] dark:text-white/60 text-black/60 dark:bg-zinc-600/50 bg-zinc-800/50'>{`${user?.firstName} ${user?.lastName}`}</div>
                                </div>
                                <div className='gap-2'>
                                    <Label>Email</Label>
                                    <div className='rounded border px-2 w-[400px] lg:w-[800px] dark:text-white/60 text-black/60 dark:bg-zinc-600/50 bg-zinc-800/50'>
                                        {user?.emailAddresses[0].emailAddress ||
                                            ""}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-start space-y-2 cursor-not-allowed'>
                                <Label>Profile Photo</Label>
                                <div className='relative w-[90px] h-[90px]'>
                                    <Image
                                        src={
                                            user?.imageUrl ||
                                            "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                        }
                                        alt='profile-picture'
                                        fill
                                    />
                                </div>
                            </div>
                        </div>
                        <Card className='my-6'>
                            <CardHeader>
                                <CardTitle>Email Preferences</CardTitle>
                                <CardDescription>
                                    Configure your email preferences.
                                </CardDescription>
                                <hr />
                            </CardHeader>
                            <CardContent className=''>
                                <div className='p-4 my-2 border rounded-xl flex items-center justify-between'>
                                    <FileIcon className='h-5 w-5' />
                                    <div>
                                        <Label>Terms and Conditions</Label>
                                        <p className='text-sm font-light'>
                                            Do you agree to our{" "}
                                            <Link
                                                href={"/terms"}
                                                className='underline'
                                            >
                                                terms and condittions
                                            </Link>
                                            ?
                                        </p>
                                    </div>
                                    <Switch
                                        checked={profile?.agreed.valueOf()}
                                        disabled
                                    />
                                </div>
                                <ProfileForm
                                    subscribed={profile?.subscribed.valueOf()}
                                />
                            </CardContent>
                        </Card>
                    </CardContent>
                </CardHeader>
            </Card>
        </main>
    );
};

export default Profile;
