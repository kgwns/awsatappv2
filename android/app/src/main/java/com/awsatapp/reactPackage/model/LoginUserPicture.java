package com.awsatapp.reactPackage.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 7/15/17.
 */

public class LoginUserPicture implements Serializable {

    private static final long serialVersionUID = 8999323172541457686L;

    @SerializedName("fid")
    private String id;
    @SerializedName("uid")
    private String userId;
    @SerializedName("filename")
    private String filename;
    @SerializedName("uri")
    private String uri;
    @SerializedName("filemime")
    private String mime;
    @SerializedName("filesize")
    private int size;
    @SerializedName("status")
    private int status;
    @SerializedName("timestamp")
    private long timestamp;
    @SerializedName("url")
    private String url;

    public LoginUserPicture() {
    }

    public LoginUserPicture(String id, String userId, String filename, String uri, String mime, int size, int status, long timestamp, String url) {
        this.id = id;
        this.userId = userId;
        this.filename = filename;
        this.uri = uri;
        this.mime = mime;
        this.size = size;
        this.status = status;
        this.timestamp = timestamp;
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getMime() {
        return mime;
    }

    public void setMime(String mime) {
        this.mime = mime;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
