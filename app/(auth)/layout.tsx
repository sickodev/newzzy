import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex items-center justify-center'>
            <div className='hidden md:block w-1/2'></div>
            <div className='w-1/2'>{children}</div>
        </div>
    );
};

export default AuthLayout;
