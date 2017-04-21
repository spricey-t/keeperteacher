package com.virohtus.keeperteacher.videos.video;

import com.virohtus.keeperteacher.videos.base.Resource;

import javax.persistence.Entity;

@Entity
public class Video extends Resource {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
