'use strict';

function playVideo(elementId, videoUrl) {
    console.log('attempting to play video: ' + videoUrl);
    if(Hls.isSupported()) {
        var video = document.getElementById(elementId);
        console.log(video);
        var hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
    }
}
