"use client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import React from "react";

const NotFound = () => {
    const onClick = () => {
        redirect("/home");
    };
    return (
        <div className='m-4'>
            <h1 className='text-center large:text-5xl medium:text-3xl text-2xl font-extrabold'>
                Oops! Page not Found
            </h1>
            <hr />
            <div className='flex justify-center'>
                <div className='grid grid-cols-4 items-center space-x-2'>
                    <ExclamationTriangleIcon className='h-6 w-6 text-yellow-500' />
                    <div className=' col-span-3'>
                        <h5>Why are you here?</h5>
                        <p>
                            <span className='underline' onClick={onClick}>
                                Click here
                            </span>{" "}
                            to go back home.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
