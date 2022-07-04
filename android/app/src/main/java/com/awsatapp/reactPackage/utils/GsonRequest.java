package com.awsatapp.reactPackage.utils;

import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpHeaderParser;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import org.json.JSONObject;

import java.lang.reflect.Type;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Copyright (C) 2016 Mtech.mobi. All rights reserved.
 * Created by Malek on 12/16/16.
 * Updated by Malek on 07/02/17.
 */


public class GsonRequest<T> extends Request<T> {

    /**
     * JSON parsing engine
     */
    protected final Gson gson;

    /**
     * class of type of response
     */
    protected final Class<T> clazz;

    /**
     * result listener
     */
    private final Response.Listener<T> listener;
    private JSONObject params = null;
    private int method;
    private Map<String, String> headers;

    public GsonRequest(int method, String url, Class<T> clazz, Response.Listener<T> listener,
                       Response.ErrorListener errorListener) {
        super(method, url, errorListener);
        this.method = method;
        this.clazz = clazz;
        this.listener = listener;
        this.gson = new Gson();
    }

    public GsonRequest(int method, String url, JSONObject params, Class<T> clazz,
                       Response.Listener<T> listener, Response.ErrorListener errorListener) {
        super(method, url, errorListener);
        this.method = method;
        this.clazz = clazz;
        this.params = params;
        this.listener = listener;
        this.gson = new Gson();

    }

    public GsonRequest(int method, String url, JSONObject params, Class<T> clazz,
                       Response.Listener<T> listener, Response.ErrorListener errorListener
            , Map<String, String> headers) {
        super(method, url, errorListener);
        this.method = method;
        this.clazz = clazz;
        this.params = params;
        this.listener = listener;
        this.gson = new Gson();
        this.headers = headers;
    }

    @Override
    public String getUrl() {
        String url = super.getUrl();
        if ((method == Method.GET || method == Method.DELETE) && getParams() != null) {
            StringBuilder stringBuilder = new StringBuilder(url);
            Iterator<Map.Entry<String, String>> iterator = null;
            iterator = getParams().entrySet().iterator();
            int i = 1;
            while (iterator.hasNext()) {
                Map.Entry<String, String> entry = iterator.next();
                if (i == 1) {
                    stringBuilder.append("?" + entry.getKey() + "=" + entry.getValue());
                } else {
                    stringBuilder.append("&" + entry.getKey() + "=" + entry.getValue());
                }
                iterator.remove(); // avoids a ConcurrentModificationException
                i++;
            }
            url = stringBuilder.toString();
        }
        Log.v("URL", url);
        return url;
    }


    @Override
    protected void deliverResponse(T response) {
        listener.onResponse(response);
    }

    @Override
    public Map<String, String> getParams() {
        if (params != null) {
            Type type = new TypeToken<Map<String, String>>() {
            }.getType();
            return gson.fromJson(params.toString(), type);
        }
        try {
            return super.getParams();
        } catch (AuthFailureError authFailureError) {
            authFailureError.printStackTrace();
        }
        return null;
    }

    @Override
    public void deliverError(VolleyError error) {
        super.deliverError(error);
    }

    @Override
    protected Response<T> parseNetworkResponse(NetworkResponse response) {
        try {
            String json = new String(
                    response.data, Charset.forName("UTF-8"));

            Log.v("Response", json);
            return Response.success(
                    gson.fromJson(json, clazz), HttpHeaderParser.parseCacheHeaders(response));

        } catch (JsonSyntaxException e) {
            return Response.error(new ParseError(e));
        }
    }

    @Override
    protected VolleyError parseNetworkError(VolleyError volleyError) {
        NetworkResponse response = volleyError.networkResponse;
        try {
            if (response != null) {
                String json = new String(
                        response.data, Charset.forName("UTF-8"));
                Log.e("Response", json);

                int code = volleyError.networkResponse.statusCode;
                byte[] bytes = json.getBytes();
                Map<String, String> headers = volleyError.networkResponse.headers;
                boolean modified = volleyError.networkResponse.notModified;
                if (code == 403) {
                    return volleyError;
                }
                return new MtechError(new NetworkResponse(code, bytes, headers, modified), json);
            } else {
                return new MtechError();
            }

        } catch (JsonSyntaxException e) {
            e.printStackTrace();
            return volleyError;
        }
    }

    @Override
    public Map<String, String> getHeaders() throws AuthFailureError {
        if (headers == null) {
            Map<String, String> map = new HashMap<>();
            map.put("Accept", "application/json");
            map.put("Content-Type", "application/json; charset=utf-8");

            return map;
        }
        headers.put("Accept", "application/json");
        headers.put("Content-Type", "application/json; charset=utf-8");
        return headers;
    }

    @Override
    public byte[] getBody() throws AuthFailureError {
        if (params != null) {
            return params.toString().getBytes();
        }
        return super.getBody();
    }

}
