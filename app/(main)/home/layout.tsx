import Navbar from "@/components/navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Newzzy | The GenZ News Zone",
    description: "A news aggregator for the new age",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className=''>
            <div>
                <Navbar />
            </div>
            <div className='p-2'>{children}</div>
        </main>
    );
};

export default HomeLayout;
