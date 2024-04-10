"use client"

import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation'
const HLSVideoPlayer = dynamic(() => import('./video_player'), { ssr: false });
import Bar from "./bar"
import { Suspense, useEffect, useState } from "react";
import VideoBox from "./video"
import  { Video } from "./video";

//get rid of the replace
//current problem is that useSearchParams appends an =
//figure that out future me

export default function Page(){
    const [videos, get_videos] = useState<Video[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8080/video_recommendations')
            .then(response => response.json())
            .then((data: Video[]) => get_videos(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const video_id = useSearchParams();

    const video_src = `/static/videos/${video_id}/${video_id}.m3u8`.replace(/=/g, '');

    return(
        <>
            <Bar />
            <div className='flex'>
                <div className='flex-col flex-auto m-10'>
                    <Suspense fallback={<div>Loading...</div>} >
                        <HLSVideoPlayer src={video_src} /> 
                    </Suspense>

                    <div>Video Man</div>
                </div>
                <div className='flex flex-col flex-auto w-[5vw]'>
                    {videos.map( video => (
                        <VideoBox title={video.title} creator={video.creator} thumbnail={video.thumbnail} url={video.url}/>
                    ))}
                </div>
            </div>
        </>
    );
}
