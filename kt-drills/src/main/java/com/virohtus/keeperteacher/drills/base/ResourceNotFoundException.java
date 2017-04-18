package com.virohtus.keeperteacher.drills.base;

public class ResourceNotFoundException extends Exception {

    private final String id;

    public ResourceNotFoundException(String id) {
        super("could not find resource with id: " + id);
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
