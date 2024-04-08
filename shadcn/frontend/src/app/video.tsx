"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export type VideoBoxProp = {
    title: string,
    creator: string,
    src: string,
};

const VideoBox = ({title, creator, src}: VideoBoxProp) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className='m-3'>
            {!imageLoaded && (
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            )}
            <div style={{ display: imageLoaded ? 'block' : 'none' }} className='flex-col space-y-3'>
                <div className="h-[125px] w-[250px] rounded-xl overflow-hidden">
                    <Image
                        src={src}
                        width={250}
                        height={125} // Adjusted to match the Skeleton height
                        alt={title}
                        objectFit="cover"
                        className="rounded-xl"
                        onLoadingComplete={handleImageLoad}
                    />
                </div>
                <div className="space-y-2">
                    <p>
                        {title}
                        <br></br>
                        {creator}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VideoBox;
