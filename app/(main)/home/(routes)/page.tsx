import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <section className=''>
                <div className='flex items-center justify-between'>
                    <div className='flex space-x-2 items-center'>
                        <h4 className='font-bold text-lg'>TOP🔥</h4>
                        <Badge variant='default' className='bg-red-500'>
                            Latest News in your area.
                        </Badge>
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
                <div className='grid grid-cols-6 grid-rows-2 gap-y-2 gap-x-2'>
                    <article className='col-span-6 w-full h-[500px] bg-blue-400'></article>
                    <article className='w-full col-span-2 row-span-1 h-[200px] bg-red-600'></article>
                    <article className='w-full col-span-2 row-span-1 h-[200px] bg-red-600'></article>
                    <article className='w-full col-span-2 row-span-1 h-[200px] bg-red-600'></article>
                </div>
            </section>
        </main>
    );
}
