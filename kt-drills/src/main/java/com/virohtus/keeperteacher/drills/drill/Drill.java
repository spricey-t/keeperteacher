package com.virohtus.keeperteacher.drills.drill;

import com.virohtus.keeperteacher.drills.base.Resource;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class Drill extends Resource {

    private String name;
    private String categoryId;

    @NotNull
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
}
