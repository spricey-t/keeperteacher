package com.virohtus.keeperteacher.drills.base;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Resource {

    private String id;
    private int _version;

    @Id
    @GenericGenerator(name = "uuid", strategy = "com.virohtus.keeperteacher.drills.base.IdGenerator")
    @GeneratedValue(generator = "uuid")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int get_version() {
        return _version;
    }

    public void set_version(int _version) {
        this._version = _version;
    }
}
