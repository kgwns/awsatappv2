package com.awsatapp.reactPackage.utils;

import com.android.volley.NetworkResponse;
import com.android.volley.VolleyError;

@SuppressWarnings("serial")
public class MtechError extends VolleyError {

    public final NetworkResponse networkResponse;
    private long networkTimeMs;

    public MtechError() {
        networkResponse = null;
    }

    public MtechError(NetworkResponse response) {
        networkResponse = response;
    }

    public MtechError(NetworkResponse response, String message) {
        super(message);
        networkResponse = response;
    }

    public MtechError(String exceptionMessage) {
        super(exceptionMessage);
        networkResponse = null;
    }

    public MtechError(String exceptionMessage, Throwable reason) {
        super(exceptionMessage, reason);
        networkResponse = null;
    }

    public MtechError(Throwable cause) {
        super(cause);
        networkResponse = null;
    }

    /* package */ void setNetworkTimeMs(long networkTimeMs) {
        this.networkTimeMs = networkTimeMs;
    }

    public long getNetworkTimeMs() {
        return networkTimeMs;
    }
}
