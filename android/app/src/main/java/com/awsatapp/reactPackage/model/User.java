package com.awsatapp.reactPackage.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 5/13/17.
 */

public class User implements Serializable {

    private static final long serialVersionUID = -585786067280138576L;


    @SerializedName("name")
    private String email;
    @SerializedName("uid")
    private String id;
    @SerializedName("followed")
    private boolean followed;
    @SerializedName("full_name")
    private String name;
    @SerializedName("thumb")
    private String thumb;
    @SerializedName("thumb_med")
    private String thumbMed;

    public User() {
    }

    public User(String email, String id, boolean followed, String name, String thumb, String thumbMed) {
        this.email = email;
        this.id = id;
        this.followed = followed;
        this.name = name;
        this.thumb = thumb;
        this.thumbMed = thumbMed;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isFollowed() {
        return followed;
    }

    public void setFollowed(boolean followed) {
        this.followed = followed;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getThumb() {
        return thumb;
    }

    public void setThumb(String thumb) {
        this.thumb = thumb;
    }

    public String getThumbMed() {
        return thumbMed;
    }

    public void setThumbMed(String thumbMed) {
        this.thumbMed = thumbMed;
    }
}
