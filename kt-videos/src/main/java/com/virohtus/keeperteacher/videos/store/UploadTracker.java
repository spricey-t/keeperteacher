package com.virohtus.keeperteacher.videos.store;

import com.amazonaws.event.ProgressEvent;
import com.amazonaws.event.ProgressListener;
import com.virohtus.keeperteacher.videos.video.Video;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

import static com.amazonaws.event.ProgressEventType.TRANSFER_COMPLETED_EVENT;
import static com.amazonaws.event.ProgressEventType.TRANSFER_FAILED_EVENT;

public class UploadTracker implements ProgressListener {

    private final Logger log = LoggerFactory.getLogger(UploadTracker.class);
    private final UploadManager uploadManager;
    private final String videoId;
    private final MultipartFile file;
    private final AtomicBoolean failed;
    private final AtomicBoolean completed;
    private final AtomicLong bytesTransferred;
    private final long totalBytes;

    public UploadTracker(UploadManager uploadManager, String videoId, MultipartFile file) {
        this.uploadManager = uploadManager;
        this.videoId = videoId;
        this.file = file;
        failed = new AtomicBoolean(false);
        completed = new AtomicBoolean(false);
        bytesTransferred = new AtomicLong(0);
        totalBytes = file.getSize();
    }


    @Override
    public void progressChanged(ProgressEvent progressEvent) {
        if(progressEvent.getEventType().isTransferEvent()) {
            switch(progressEvent.getEventType()) {
                case TRANSFER_FAILED_EVENT: failed.set(true); break;
                case TRANSFER_COMPLETED_EVENT: completed.set(true); break;
            }
            uploadManager.reportStatusUpdate(this);
            return;
        }

        if(progressEvent.getEventType().isByteCountEvent()) {
            int previousPercentage = getPercentComplete();
            bytesTransferred.addAndGet(progressEvent.getBytesTransferred());
            int newPercentage = getPercentComplete();

            // this throttles reporting
            if(previousPercentage < newPercentage) {
                uploadManager.reportStatusUpdate(this);
            }
        }
    }

    public String getVideoId() {
        return videoId;
    }

    public int getPercentComplete() {
        return (int) ((bytesTransferred.get() * 100.0) / totalBytes);
    }

    public boolean isFailed() {
        return failed.get();
    }

    public boolean isCompleted() {
        return completed.get();
    }
}
