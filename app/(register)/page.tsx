import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import SetupForm from "@/components/setup-form";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { initialProfile } from "@/lib/initial-profile";

const Register = async () => {
    const profile: Profile = await initialProfile();
    const agreed = await db.profile.findFirst({
        where: {
            userId: profile.userId,
            agreed: true,
        },
    });

    if (agreed) {
        return redirect("/home");
    }

    return (
        <div className='flex items-center justify-center m-2'>
            <Card className='w-[500px]'>
                <CardHeader>
                    <CardTitle className='text-2xl'>
                        Setup your Newzzy Profile
                    </CardTitle>
                    <CardDescription className='font-light'>
                        Fill in the preferences for your Newzzy profile.
                    </CardDescription>
                </CardHeader>
                <SetupForm userId={profile.userId} />
            </Card>
        </div>
    );
};

export default Register;
