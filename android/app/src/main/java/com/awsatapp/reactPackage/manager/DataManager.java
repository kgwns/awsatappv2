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

import com.awsatapp.R;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.model.Login;
import com.awsatapp.reactPackage.model.LoginUser;


public class DataManager {

    private static DataManager mInstance;
    private CoreCacheManager mCacheManager;

    private LoginUser mUser;
    private String mCookie;
    private String mToken;

    /**
     * Returns a synchronized instance of the DataManger
     *
     * @param context
     * @return
     */
    public static synchronized DataManager getInstance(Context context) {
        if (mInstance == null) {
            mInstance = new DataManager(context);
        }
        return mInstance;
    }

    /**
     * Automatically retrieves the user object, cookie and token from cache;
     *
     * @param context
     */
    public DataManager(Context context) {
        mCacheManager = CoreCacheManager.getInstance(context);
        mUser = (LoginUser) mCacheManager.getCache(Constant.CACHE_LOGIN_USER);
        mCookie = mCacheManager.get(Constant.CACHE_COOKIE);
        mToken = mCacheManager.get(Constant.CACHE_TOKEN);
    }

    public void reset(Context context){
        mInstance = new DataManager(context);
    }

    /**
     * Set the user upon login or signup. It automatically saves the object to cache and sets the token
     * and cookie.
     *
     * @param login
     */
    public void setUser(Login login) {
        this.mUser = login.getUser();
        mUser.setName(login.getExtra().getName());
        mCacheManager.setCache(Constant.CACHE_LOGIN_USER, mUser);

        mCookie = login.getSessionName() + "=" + login.getSessionId();
        mCacheManager.set(Constant.CACHE_COOKIE, mCookie);

        mToken = login.getToken();
        mCacheManager.set(Constant.CACHE_TOKEN, mToken);

    }

    /**
     * Returns the logged in user object
     *
     * @return the logged in user
     */
    public LoginUser getUser() {
        return this.mUser;
    }

    /**
     * Returns the cookie for this user that is saved also in cache
     *
     * @return cookie string
     */
    public String getCookie() {
        return mCookie;
    }

    /**
     * Returns the token for this user that is saved also in cache
     *
     * @return
     */
    public String getToken() {
        return mToken;
    }

    public boolean isArabic() {
        return mCacheManager.get(Constant.CACHE_LANGUAGE, "en").equals("ar");
    }

    public String getLanguage() {
        return mCacheManager.get(Constant.CACHE_LANGUAGE, "ar");
    }


    public void setTextSize(int size) {
        mCacheManager.set(Constant.CACHE_TEXT_SIZE, size);
    }

    public int getTextSize() {
        final boolean tabletSize = mCacheManager.getContext().getResources().getBoolean(R.bool.isTablet);
        if (tabletSize)
            return mCacheManager.getInt(Constant.CACHE_TEXT_SIZE, 32);
        else
            return mCacheManager.getInt(Constant.CACHE_TEXT_SIZE, 22);
    }

    public boolean isCacheEnabled() {
        return mCacheManager.getBoolean(Constant.CACHE_CACHE_ENABLED, true);
    }

    public void setCacheEnabled(boolean enabled) {
        mCacheManager.set(Constant.CACHE_CACHE_ENABLED, enabled);
    }

    public boolean isInvertColor() {
        return mCacheManager.getBoolean(Constant.CACHE_INVERT_COLOR, false);
    }

    public void setInvertColor(boolean enabled) {
        mCacheManager.set(Constant.CACHE_INVERT_COLOR, enabled);
    }

    public boolean isMobileData() {
        return mCacheManager.getBoolean(Constant.CACHE_MOBILE_DATA, true);
    }

    public void setMobileData(boolean enabled) {
        mCacheManager.set(Constant.CACHE_MOBILE_DATA, enabled);
    }

    /**
     * Sets if the user skipped login
     * @param enabled
     */
    public void setSkipLogin(boolean enabled) {
        mCacheManager.set(Constant.CACHE_SKIP_LOGIN, enabled);
    }

    /**
     * Returns if the user skipped login
     * @return
     */
    public boolean getSkipLogin() {
        return mCacheManager.getBoolean(Constant.CACHE_SKIP_LOGIN);
    }
}
