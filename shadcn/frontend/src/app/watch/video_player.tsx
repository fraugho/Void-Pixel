"use client"

import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

interface HLSVideoPlayerProps {
    src: string; // Define the prop types
}

const HLSVideoPlayer: React.FC<HLSVideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const initVideoPlayer = (videoElement: HTMLVideoElement, sourceUrl: string) => {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(sourceUrl);
                hls.attachMedia(videoElement);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoElement.play();
                });
            } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                videoElement.src = sourceUrl;
                videoElement.addEventListener('loadedmetadata', () => {
                    videoElement.play();
                });
            } else {
                console.error('HLS is not supported in this browser.');
            }
        };

        initVideoPlayer(video, src);

        // Cleanup on component unmount
        return () => {
            if (video && video.src) {
                video.pause();
                video.src = '';
                video.load();
            }
        };
    }, [src]);

    return <video ref={videoRef} controls className='w-full h-auto aspect-[16/9]' />;
};

export default HLSVideoPlayer;
