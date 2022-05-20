package com.awsatapp.reactPackage.model;



import androidx.annotation.Nullable;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 7/15/17.
 */

public class LoginUser implements Serializable {

    private static final long serialVersionUID = 8639002048383778682L;

    @SerializedName("uid")
    private String id;
    @SerializedName("name")
    private String name;
    @SerializedName("mail")
    private String email;
    @SerializedName("status")
    private int status;
    @SerializedName("language")
    private String language;
    @SerializedName("picture")
    private LoginUserPicture picture;
//    @SerializedName("field_preferred_cats")
//    private PreferredCategory preferredCategory;

    public LoginUser() {
    }

    public LoginUser(String id, String name, String email, int status, String language, LoginUserPicture picture) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.status = status;
        this.language = language;
        this.picture = picture;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public LoginUserPicture getPicture() {
        return picture;
    }

    public void setPicture(LoginUserPicture picture) {
        this.picture = picture;
    }

//    public PreferredCategory getPreferredCategory() {
//        return preferredCategory;
//    }
//
//    public void setPreferredCategory(PreferredCategory preferredCategory) {
//        this.preferredCategory = preferredCategory;
//    }

    public class PreferredCategory implements Serializable {

        private static final long serialVersionUID = -3797255656792929157L;

        @Nullable
        @SerializedName("und")
        private Selected[] selected;

        public PreferredCategory() {
        }

        public PreferredCategory(@Nullable Selected[] selected) {
            this.selected = selected;
        }

        public Selected[] getSelected() {
            return selected;
        }

        public void setSelected(Selected[] selected) {
            this.selected = selected;
        }

        public class Selected implements Serializable {

            private static final long serialVersionUID = -8419616568302255376L;

            @SerializedName("tid")
            private int id;

            public Selected() {
            }

            public int getId() {
                return id;
            }

            public void setId(int id) {
                this.id = id;
            }
        }
    }
}
