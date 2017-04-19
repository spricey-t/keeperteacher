package com.virohtus.keeperteacher.drills.category;

import com.virohtus.keeperteacher.drills.base.Resource;
import com.virohtus.keeperteacher.drills.drill.Drill;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Category extends Resource {

    private String name;
    private Set<Drill> drills;

    public Category() {
        drills = new HashSet<>();
    }

    public Category(String categoryId) {
        this();
        setId(categoryId);
    }

    @NotNull
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
