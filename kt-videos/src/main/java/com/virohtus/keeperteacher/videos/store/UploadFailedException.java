package com.virohtus.keeperteacher.videos.store;

public class UploadFailedException extends Exception {

    private final String videoId;
    private final String filename;

    public UploadFailedException(String videoId, String filename) {
        this.videoId = videoId;
        this.filename = filename;
    }

    public UploadFailedException(String videoId, String filename, Exception e) {
        super(e);
        this.videoId = videoId;
        this.filename = filename;
    }

    public String getVideoId() {
        return videoId;
    }

    public String getFilename() {
        return filename;
    }
}
