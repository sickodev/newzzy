"use client";
import React from "react";
import useSWR from "swr";
import Loading from "./loading";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());
const QuoteGenerator = () => {
    const { data, error, isLoading } = useSWR(
        "https://dummyjson.com/quotes/random",
        fetcher,
        {
            refreshInterval: 24 * 60 * 60 * 1000, //refresh interval: 1 day
            revalidateOnMount: true,
        }
    );
    console.log(data);
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <p className='text-center'>Failed to Fetch</p>;
    }

    return (
        <div className='mx-4'>
            <p className='text-center'>
                &quot;{" "}
                <span className='font-bold text-sm opacity-60'>
                    {data.quote}
                </span>{" "}
                &quot;
            </p>
        </div>
    );
};

export default QuoteGenerator;
