package com.virohtus.keeperteacher.videos.store;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

@Service
public class UploadManager {

    private final Logger log = LoggerFactory.getLogger(UploadManager.class);
    private final StorageService storageService;
    private final Set<UploadTracker> inFlightUploads;

    @Autowired
    public UploadManager(StorageService storageService) {
        this.storageService = storageService;
        this.inFlightUploads = new ConcurrentSkipListSet<>();
    }

    public void upload(String videoId, MultipartFile file) throws UploadFailedException {
        try {
            // todo don't need storage service right? - same level of abstraction as this
            UploadTracker uploadTracker = new UploadTracker(this, videoId, file);
            storageService.store(videoId, file, uploadTracker);

            synchronized (uploadTracker) {
                while (!uploadTracker.isCompleted() && !uploadTracker.isFailed()) {
                    uploadTracker.wait();
                }
            }
            if(uploadTracker.isFailed()) {
                throw new UploadFailedException(videoId, file.getOriginalFilename());
            }
            log.warn(String.format("upload: %s completed", uploadTracker.getVideoId()));
        } catch (Exception e) {
            throw new UploadFailedException(videoId, file.getOriginalFilename(), e);
        }
    }

    public void reportStatusUpdate(UploadTracker uploadTracker) {
        if(uploadTracker.isFailed() || uploadTracker.isCompleted()) {
            synchronized (uploadTracker) {
                uploadTracker.notifyAll();
            }
            return;
        }
        log.info(String.format("upload: %s - %d%%", uploadTracker.getVideoId(), uploadTracker.getPercentComplete()));
    }
}
