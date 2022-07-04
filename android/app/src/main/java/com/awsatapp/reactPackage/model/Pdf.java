package com.awsatapp.reactPackage.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.liulishuo.filedownloader.BaseDownloadTask;

import java.io.Serializable;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 5/16/17.
 */

public class Pdf implements Serializable {

    private static final long serialVersionUID = 9213414884797293437L;

    @SerializedName("thumbnail")
    private String thumb;
    @SerializedName("resource")
    private String url;
    @SerializedName("issueNumber")
    private String issueNumber;
    @SerializedName("issueDate")
    private long created;

    @Expose(serialize = false, deserialize = false)
    private int status = 0; // 0 for download, 1 for downlaoding, 2 for downloaded

    @Expose(serialize = false, deserialize = false)
    private BaseDownloadTask mDownloadTask = null;

    public Pdf() {
    }

    public String getThumb() {
        return thumb;
    }

    public void setThumb(String thumb) {
        this.thumb = thumb;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIssueNumber() {
        return issueNumber;
    }

    public void setIssueNumber(String issueNumber) {
        this.issueNumber = issueNumber;
    }

    public long getCreated() {
        return created;
    }

    public void setCreated(long created) {
        this.created = created;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public BaseDownloadTask getmDownloadTask() {
        return mDownloadTask;
    }

    public void setmDownloadTask(BaseDownloadTask mDownloadTask) {
        this.mDownloadTask = mDownloadTask;
    }
}
