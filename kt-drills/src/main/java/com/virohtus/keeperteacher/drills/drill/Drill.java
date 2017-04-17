package com.virohtus.keeperteacher.drills.drill;

import com.virohtus.keeperteacher.drills.base.Resource;

import javax.persistence.Entity;

@Entity
public class Drill extends Resource {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
