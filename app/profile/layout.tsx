import Navbar from "@/components/navbar";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className='p-1'>{children}</div>
        </div>
    );
};

export default ProfileLayout;
