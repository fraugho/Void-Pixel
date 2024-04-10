"use client"

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Video = {
    title: string,
    creator: string,
    url: string,
    thumbnail: string,
};

const VideoBox = ({ title, creator, thumbnail, url }: Video) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handle_image_load = () => {
        setImageLoaded(true);
    };

    const router = useRouter();

    const handle_click = () => {
        router.push(url)
    };

    return (
        <div className='m-3'>
            {!imageLoaded && (
                <div className="flex space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            )}
            <div style={{ display: imageLoaded ? 'flex' : 'none' }} className='flex-row rounded-xl hover:outline hover:outline-offset-[10px] hover:outline-white-5' onClick={handle_click}>
                <div className="h-[125px] w-[250px] rounded-xl overflow-hidden">
                    <Image
                        src={thumbnail}
                        width={250}
                        height={125}
                        alt={title}
                        objectFit="cover"
                        className="rounded-xl"
                        onLoadingComplete={handle_image_load}
                        priority
                    />
                </div>
                <div className="flex flex-col ml-2">
                    <div>{title}</div>
                    <div className="flex mt-1">
                        <Avatar className="w-5 h-5 mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">{creator}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoBox;
