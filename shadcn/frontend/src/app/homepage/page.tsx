"use client"

import VideoBox from "./video3"
import  { Video } from "./video3";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

import {useState, useEffect} from "react"

export default function Home() {
    const [videos, set_videos] = useState<Video[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8080/video_recommendations')
            .then(response => response.json())
            .then((data: Video[]) => set_videos(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <body>
            <div className="flex items-center overflow-hidden justify-between m-4 max-w-screen">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="ml-3">User</span> 
                </div>
                <div className="flex flex-grow justify-center">
                    <Input type="text" className="px-3 py-2 w-1/2" placeholder="Search..." />
                    <Button className="ml-2 px-3 py-2">Search</Button>
                </div>
                <div className="text-right">Void Pixel</div>
                <div className="flex ml-30">
                    <ModeToggle />
                </div>
            </div>

            <div id="video_container"className="flex flex-wrap m-3 mt-10 justify-center">
                {videos.map( video => (
                    <VideoBox title={video.title} creator={video.creator} thumbnail={video.thumbnail} url={video.url}/>
                ))}
            </div>

        </body>
    );
}
