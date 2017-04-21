package com.virohtus.keeperteacher.videos.base;

public class ResourceNotFoundException extends Exception {

    private final String resourceId;

    public ResourceNotFoundException(String resourceId) {
        this.resourceId = resourceId;
    }

    public String getResourceId() {
        return resourceId;
    }
}
