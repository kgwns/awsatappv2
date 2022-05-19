/*
 * Copyright (c)
 * Copyright (C) 2017. Codeline Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Malek Hijazi<malek.hijazii@gmail.com>, 2017
 *
 */

package com.awsatapp.reactPackage.manager;
import android.content.Context;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.model.PdfWrapper;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

class ApiConstant {
    public static final String BASE = " https://aawsat.com/";


    public static final String GET_PDF = "http://api.aawsat.com/api/pdf/";
}

public class NetworkManager extends CoreNetworkManager {
    public static final int limit = 10;

    public NetworkManager(Context context) {
        super(context);
    }


    public void getPdfArchive(final Listener<PdfWrapper> listener) throws JSONException {
        String url = ApiConstant.GET_PDF;
        JSONObject params = new JSONObject();
        params.put("lang", getLanguage());
        get(url, params, getHeaders(), listener, PdfWrapper.class);
    }

    /**
     * Returns the headers that are needed for the apis that require authentication. It retuns a cookie
     * header and a token header
     *
     * @return Hashmap of headers
     */
    private HashMap<String, String> getHeaders() {
        DataManager manager = DataManager.getInstance(mContext);

        HashMap<String, String> headers = new HashMap<>();
        headers.put(Constant.HEADER_COOKIE, manager.getCookie());
        headers.put(Constant.HEADER_CSRF, manager.getToken());
        return headers;
    }

    private String getLanguage() {
        return CoreCacheManager.getInstance(mContext).get(Constant.CACHE_LANGUAGE, "ar");
    }
}
