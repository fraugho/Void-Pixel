"use client"

import React from "react";
import Hls from "hls.js";

export default class VideoPlayer extends React.Component {
    // Define the type for state if you have any state variables
    state = {};

    // Create a ref for the video element
    private playerRef = React.createRef<HTMLVideoElement>();

    componentDidUpdate() {
        // Access the current video element safely
        const video = this.playerRef.current;

        if (video) { // Check if the video element exists
            const hls = new Hls();
            const url = "http://127.0.0.1:8080/videos/bird_beach/bird_beach.m3u8";

            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() { video.play(); });
        }
    }

    render() {
        return (
            <video
                className="videoCanvas"
                ref={this.playerRef} // Use the created ref here
                autoPlay={true}
            />
        );
    }
}
