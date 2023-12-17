import React from "react";
import { Permanent_Marker } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ModeToggle } from "./mode-toggle";
import QuoteGenerator from "./quote-generator";
import { PersonIcon } from "@radix-ui/react-icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

const font = Permanent_Marker({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
    return (
        <nav>
            <div className='flex items-center justify-between shadow-lg border p-1'>
                <h5 className={cn(" font-bold text-xl", font.className)}>
                    <Link href={"/home"}>Newzzy | The GenZ News Zone</Link>
                </h5>
                <div className='flex space-x-2 items-center dark:bg-neutral-800 bg-zinc-300/60 px-2 py-0.5 rounded-full'>
                    <ModeToggle />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href={"/profile"}>
                                    <PersonIcon className='h-5 w-5' />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className='px-2'>
                                    <p>Profile</p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <UserButton />
                </div>
            </div>
            <div>
                <QuoteGenerator />
            </div>
            <div className='uppercase flex items-center justify-evenly text-sm p-2 dark:bg-neutral-900 bg-neutral-300'>
                <Link href={"/top"}>
                    <div>
                        Top
                        <Badge
                            variant='outline'
                            className='text-xs bg-red-500 scale-75'
                        >
                            Latest
                        </Badge>
                    </div>
                </Link>
                <Link href={"/home/trending"}>Trending</Link>
                <Link href={"/home/worldwide"}>Worldwide</Link>
                <Link href={"/home/national"}>National</Link>
                <Link href={"/home/entertainment"}>Enterntainment</Link>
                <Link href={"/home/finance"}>Finance</Link>
                <Link href={"/home/sports"}>Sports</Link>
                <Link href={"/home/technology"}>Technology</Link>
            </div>
        </nav>
    );
};

export default Navbar;
