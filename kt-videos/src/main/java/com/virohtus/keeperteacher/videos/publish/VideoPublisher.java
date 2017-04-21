package com.virohtus.keeperteacher.videos.publish;

import com.virohtus.keeperteacher.videos.base.ResourceNotFoundException;
import com.virohtus.keeperteacher.videos.store.UploadFailedException;
import com.virohtus.keeperteacher.videos.store.UploadManager;
import com.virohtus.keeperteacher.videos.transcode.TranscodeManager;
import com.virohtus.keeperteacher.videos.video.VideoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.ExecutorService;

@Service
public class VideoPublisher {

    private final Logger log = LoggerFactory.getLogger(VideoPublisher.class);
    private final ExecutorService executorService;
    private final VideoService videoService;
    private final UploadManager uploadManager;
    private final TranscodeManager transcodeManager;

    @Autowired
    public VideoPublisher(ExecutorService executorService, VideoService videoService, UploadManager uploadManager, TranscodeManager transcodeManager) {
        this.executorService = executorService;
        this.videoService = videoService;
        this.uploadManager = uploadManager;
        this.transcodeManager = transcodeManager;
    }


    public void publishVideo(String videoId, MultipartFile file) throws ResourceNotFoundException {
        videoService.findById(videoId);
        executorService.submit(() -> {
            try {
                uploadManager.upload(videoId, file);
                transcodeManager.transcode(videoId);
            } catch (UploadFailedException e) {
                log.warn(String.format("failed to upload video: %s file: %s", videoId, file.getOriginalFilename()), e);
            }
        });
    }
}
