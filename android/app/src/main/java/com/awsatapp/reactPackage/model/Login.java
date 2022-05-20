package com.awsatapp.reactPackage.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 7/15/17.
 */

public class Login implements Serializable {

    private static final long serialVersionUID = -4863450160792637740L;

    @SerializedName("sessid")
    private String sessionId;
    @SerializedName("session_name")
    private String sessionName;
    @SerializedName("token")
    private String token;
    @SerializedName("user")
    private LoginUser user;
    @SerializedName("extra")
    private User extra;

    public Login() {
    }

    public Login(String sessionId, String sessionName, String token, LoginUser user, User extra) {
        this.sessionId = sessionId;
        this.sessionName = sessionName;
        this.token = token;
        this.user = user;
        this.extra = extra;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getExtra() {
        return extra;
    }

    public void setExtra(User extra) {
        this.extra = extra;
    }

    public LoginUser getUser() {
        return user;
    }

    public void setUser(LoginUser user) {
        this.user = user;
    }
}
