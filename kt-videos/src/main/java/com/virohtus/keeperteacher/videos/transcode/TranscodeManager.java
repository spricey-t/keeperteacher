package com.virohtus.keeperteacher.videos.transcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TranscodeManager {

    private final Logger log = LoggerFactory.getLogger(TranscodeManager.class);

    public void transcode(String videoId) {
        log.info("transcoding started for video: " + videoId);
    }
}
