// Assuming the <video> tag has an id="videoPlayer"
const video = document.getElementById('videoPlayer');
const videoSrc = 'static/HLS/bird_beach/bird_beach.m3u8'; // Your HLS .m3u8 URL

// Function to initialize the video player
function initVideoPlayer(videoElement, sourceUrl) {
  if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(sourceUrl);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            videoElement.play();
        });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = sourceUrl;
        videoElement.addEventListener('loadedmetadata', function() {
            videoElement.play();
        });
    } else {
        console.error('HLS is not supported in this browser.');
    }
}


// Initialize the player when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => initVideoPlayer(video, videoSrc));
