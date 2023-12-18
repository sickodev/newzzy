"use client";
import { Badge } from "@/components/ui/badge";
import { url } from "@/lib/news-url";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { env } from "process";
import useSWR from "swr";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const EntertainmentNews = () => {
    const apikey = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
    const rows = [];
    const { data, isLoading, error } = useSWR(
        `https://gnews.io/api/v4/top-headlines?category=entertainment&apikey=${apikey}&max=5&lang=en`,
        fetcher
    );

    if (isLoading) {
        return <p className='text-center'>Loading...</p>;
    }

    if (error) {
        redirect("/home");
    }

    if (data) {
        for (let index = 1; index < 5; index++) {
            rows.push(data.articles[index]);
        }
    }

    const topNews = data.articles[0];

    if (!apikey) {
        return null;
    }

    return (
        <div className=''>
            <div className='flex items-center justify-between'>
                <div className='flex space-x-2 items-center'>
                    <h4 className='font-bold text-lg'>ENTERTAINMENT</h4>
                </div>
                <Link
                    href={"/home/top"}
                    className='font-bold flex items-center justify-between gap-2 hover:underline'
                >
                    More News
                    <ArrowRightIcon className='w-5 h-5' />
                </Link>
            </div>
            <hr className='w-[500px] my-2' />
            <div className='grid grid-cols-6 grid-rows-4 gap-2'>
                <article className='col-span-4 row-span-4 w-full'>
                    <div className='w-full h-[400px] relative object-contain'>
                        <img
                            src={topNews.image}
                            alt={topNews.title}
                            className='w-full h-full'
                        />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <h2 className='text-lg font-bold'>{topNews.title}.</h2>
                        <p className='text-sm font-light italic opacity-60'>
                            {topNews.description}
                        </p>
                    </div>
                </article>
                {rows.map((row) => (
                    <article
                        key={row}
                        className='col-span-2 w-full h-[100px] flex items-start space-x-2 my-2'
                    >
                        <div className='w-[120px] h-[100px]'>
                            <img
                                src={row.image}
                                alt={row.title}
                                className='w-full h-full object-fill'
                            />
                        </div>
                        <div>
                            <h4 className='font-bold'>{row.title}.</h4>
                            <p className='text-sm opacity-60 font-light italic'>
                                {row.description.substring(0, 60) + "..."}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default EntertainmentNews;
