/*
 * Copyright (c)
 * Copyright (C) 2017. Codeline Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Malek Hijazi<malek.hijazii@gmail.com>, 2017
 *
 */

package com.awsatapp.reactPackage.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class PdfWrapper implements Serializable {


    private static final long serialVersionUID = -8506529036364054622L;
    @SerializedName("success")
    private boolean success;
    @SerializedName("data")
    private Pdf[] data;

    public PdfWrapper() {
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Pdf[] getData() {
        return data;
    }

    public void setData(Pdf[] data) {
        this.data = data;
    }
}
