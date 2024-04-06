"use client"

import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation'
const HLSVideoPlayer = dynamic(() => import('./video_player'), { ssr: false });
import Bar from "./bar"
import { Suspense } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio"

//get rid of the replace
//current problem is that useSearchParams appends an =
//figure that out future me

export default function Page(){
    const video_id = useSearchParams();

    const video_src = `http://127.0.0.1:8080/static/HLS/${video_id}/${video_id}.m3u8`.replace(/=/g, '');

    return(
        <>
            <Bar />
            <div className='flex-col m-10'>
                <Suspense fallback={<div>Loading...</div>} >
                    <HLSVideoPlayer src={video_src} /> 
                </Suspense>

                <h1>Video Man</h1>
            </div>
        </>
    );
}
