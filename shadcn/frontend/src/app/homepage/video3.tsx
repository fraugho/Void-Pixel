"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from 'next/navigation'

export type Video = {
    title: string,
    creator: string,
    url: string,
    thumbnail: string,
};

const VideoBox = ({ title, creator, thumbnail, url }: Video) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const router = useRouter();

    const handle_click = () => {
        router.push(url)
    }


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
            <div style={{ display: imageLoaded ? 'block' : 'none' }} className='flex-col space-y-3' onClick={handle_click}>
                <div className="h-[125px] w-[250px] rounded-xl overflow-hidden">
                    <Image
                        src={thumbnail}
                        width={250}
                        height={125}
                        alt={title}
                        objectFit="cover"
                        className="rounded-xl"
                        onLoadingComplete={handleImageLoad}
                        priority // Important for above-the-fold images
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
