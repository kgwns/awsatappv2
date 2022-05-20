
package com.awsatapp.reactPackage.manager;

import android.content.Context;
import android.content.Intent;

import com.android.volley.NoConnectionError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.awsatapp.MainActivity;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.model.LoginUser;
import com.awsatapp.reactPackage.utils.GsonRequest;
import com.awsatapp.reactPackage.utils.NetworkUtil;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class CoreNetworkManager {
    public Context mContext;
    public CoreCacheManager mCacheManager;
    private boolean sessionExpired = false;

    public interface Listener<T> {
        /**
         * Called when a response is received.
         */
        public void onSuccess(T response);

        public void onError(Exception e);
    }

    public CoreNetworkManager(Context context) {
        this.mContext = context;
        this.mCacheManager = CoreCacheManager.getInstance(mContext);
    }

    public static void addToQueue(Context context, JsonObjectRequest jsObjRequest) {
        VolleyManager.getInstance(context).addToRequestQueue(jsObjRequest);
    }

    public static void addToQueue(Context context, JsonArrayRequest jsObjRequest) {
        VolleyManager.getInstance(context).addToRequestQueue(jsObjRequest);
    }

    public static void addToQueue(Context context, GsonRequest jsObjRequest) {
        VolleyManager.getInstance(context).addToRequestQueue(jsObjRequest);
    }

    public static void addToQueue(Context context, Request jsObjRequest) {
        VolleyManager.getInstance(context).addToRequestQueue(jsObjRequest);
    }

    protected <T> void get(String url, final Listener<T> listener, Class<T> clazz) {
        get(url, null, listener, clazz);
    }

    protected <T> void get(String url, JSONObject params, final Listener<T> listener, Class<T> clazz) {
        get(url, params, null, listener, clazz);
    }

    protected <T> void get(String url, JSONObject params, HashMap<String, String> headers, final Listener<T> listener, Class<T> clazz) {
        execute(url, params, headers, listener, clazz, Request.Method.GET);
    }

    protected <T> void post(String url, final Listener<T> listener, Class<T> clazz) {
        post(url, null, listener, clazz);
    }

    protected <T> void post(String url, JSONObject params, final Listener<T> listener, Class<T> clazz) {
        post(url, params, null, listener, clazz);
    }

    protected <T> void post(String url, JSONObject params, HashMap<String, String> headers, final Listener<T> listener, Class<T> clazz) {
        execute(url, params, headers, listener, clazz, Request.Method.POST);
    }

    private <T> void execute(final String url, final JSONObject params, final HashMap<String, String> headers, final Listener<T> listener, Class<T> clazz, final int method) {
        if (method == Request.Method.GET) {
            //if caching enabled return cached request if found
            if (DataManager.getInstance(mContext).isCacheEnabled())
                checkIfCached(url, params, headers, listener, method);
        }
        if (NetworkUtil.getConnectivityStatus(mContext) == NetworkUtil.TYPE_MOBILE) {
            if (!DataManager.getInstance(mContext).isMobileData()) {
                Exception e = new Exception("{message: 'Mobile data disabled in settings'}");
                listener.onError(e);
                return;
            }
        }
        if (NetworkUtil.isConnected(mContext)) {
            GsonRequest<T> request = new GsonRequest<T>(method,
                    url, params, clazz,
                    new Response.Listener<T>() {
                        @Override
                        public void onResponse(T response) {
                            if (method == Request.Method.GET) {
                                //if caching enabled cache the url request
                                if (DataManager.getInstance(mContext).isCacheEnabled())
                                    setUrlCache(merge(url, params, headers, method), response);
                            }
                            listener.onSuccess(response);
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError e) {
                            if (e.networkResponse != null && e.networkResponse.statusCode == 403) {
                                handleSessionExpired();
                            } else {
                                listener.onError(e);
                            }
                            e.printStackTrace();
                        }
                    }, headers);

            addToQueue(mContext, request);
        } else {
            listener.onError(new NoConnectionError());
        }
    }

    private <T> void setUrlCache(String url, T response) {
        if (response != null) {
            mCacheManager.setCache(url, response);
        }
    }

    private <T> void checkIfCached(String url, JSONObject params, HashMap<String, String> headers, Listener<T> listener, int method) {
        String newUrl = merge(url, params, headers, method);
        Object object = mCacheManager.getCache(newUrl);
        if (object != null && (!params.has("offset") && !params.has("count"))) {
            listener.onSuccess((T) object);
        }
    }

    /**
     * Calls the merging functions and returns a merged string
     *
     * @param url     url
     * @param params  Parameters as JSONObject
     * @param headers Headers as Hashmap<String, String>
     * @param method  Post/Get...
     * @return
     */
    private String merge(String url, JSONObject params, HashMap<String, String> headers, int method) {
        String newUrl = mergeUrlAndParams(url, params).replace(ApiConstant.BASE, "");
        newUrl = newUrl.replaceAll("[^a-zA-Z0-9]", ""); // max file name is 100 with extension, so to be on the safe side
        if (newUrl.length() > 90) {
            newUrl = newUrl.substring(0, 90);
        }
        newUrl = newUrl + "method" + method;

        return newUrl;
    }

    /**
     * Adds parameters to the end of url
     *
     * @param url    url
     * @param params parameters as JsonObject
     * @return
     */
    private String mergeUrlAndParams(String url, JSONObject params) {

        if (params != null) {
            StringBuilder stringBuilder = new StringBuilder(url);
            Iterator<String> iterator = null;
            try {
                iterator = new JSONObject(params.toString()).keys();
            } catch (JSONException e) {
                e.printStackTrace();
            }
            int i = 1;
            while (iterator.hasNext()) {
                String key = iterator.next();
                try {
                    if (i == 1) {
                        stringBuilder.append("?" + key + "=" + params.get(key));
                    } else {
                        stringBuilder.append("&" + key + "=" + params.get(key));
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                iterator.remove(); // avoids a ConcurrentModificationException
                i++;
            }
            return stringBuilder.toString();
        } else {
            return url;
        }
    }

    /**
     * Adds headrs to the end of a url
     *
     * @param url     url
     * @param headers headers as Hashmap<String, String>
     * @return
     */
    private String mergeUrlAndHeaders(String url, HashMap<String, String> headers) {
        if (headers != null) {
            StringBuilder stringBuilder = new StringBuilder(url);
            Iterator<Map.Entry<String, String>> iterator = null;
            iterator = headers.entrySet().iterator();
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
            return stringBuilder.toString();
        }
        return url;
    }

    private void handleSessionExpired() {
        CoreCacheManager cacheManager = CoreCacheManager.getInstance(mContext);
        LoginUser user = (LoginUser) cacheManager.getCache(Constant.CACHE_LOGIN_USER);
        if (user == null)
            return;
        cacheManager.clear(Constant.CACHE_LOGIN_USER);
        Intent i = new Intent(mContext, MainActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(i);
    }
}
