import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

const Loading = () => {
    return (
        <div className='flex justify-center'>
            <ReloadIcon className='w-10 h-10 animate-spin' />
        </div>
    );
};

export default Loading;
