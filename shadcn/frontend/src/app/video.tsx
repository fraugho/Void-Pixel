"use client"

import Image from 'next/image';
import {Skeleton} from "@nextui-org/skeleton";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Suspense } from 'react'


type VideoBoxProp = {
    title: string,
    src: string,
}

const VideoBox = ({title, src}: VideoBoxProp) => {
    const PlaceholderComponent = () => (
        <Card className="w-[200px] space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">  
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    );
    return (
        <div className='m-3'>
            <Suspense fallback={<PlaceholderComponent />}>
                <Image
                    src={src}
                    width={200}
                    height={300}
                    alt={title}
                    objectFit="cover"
                    className="rounded-md"
                />
                <p>{title}</p>
            </Suspense>
        </div>
    );
}

export default VideoBox
