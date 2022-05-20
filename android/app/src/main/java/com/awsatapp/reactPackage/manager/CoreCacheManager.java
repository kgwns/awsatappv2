package com.awsatapp.reactPackage.manager;

/**
 * Copyright (C) 2015 Mtech.mobi All rights reserved.
 * <p/>
 * Created by Malek Hijazi on 8/31/2015.
 */


import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class CoreCacheManager {

    private static CoreCacheManager mInstance;
    private SharedPreferences mPreferences;
    private SharedPreferences.Editor mEditor;

    private Context mContext;

    private CoreCacheManager(Context context) {
        this.mContext = context;
        mPreferences = context.getSharedPreferences(mContext.getPackageName(), Context.MODE_PRIVATE);
    }

    public static synchronized CoreCacheManager getInstance(Context context) {
        if (mInstance == null) {
            mInstance = new CoreCacheManager(context);
        }
        return mInstance;
    }

    public void set(String key, String value) {
        mEditor = mPreferences.edit();
        mEditor.putString(key, value);
        mEditor.apply();
    }

    public void set(String key, boolean value) {
        mEditor = mPreferences.edit();
        mEditor.putBoolean(key, value);
        mEditor.apply();
    }

    public void set(String key, float value) {
        mEditor = mPreferences.edit();
        mEditor.putFloat(key, value);
        mEditor.apply();
    }

    public void set(String key, int value) {
        mEditor = mPreferences.edit();
        mEditor.putInt(key, value);
        mEditor.apply();
    }

    public String get(String key) {
        return get(key, "");
    }

    public String get(String key, String defaultValue) {
        return mPreferences.getString(key, defaultValue);
    }

    public double getFloat(String key) {
        return mPreferences.getFloat(key, 0);
    }

    public boolean getBoolean(String key, boolean defualt) {
        return mPreferences.getBoolean(key, defualt);
    }

    public boolean getBoolean(String key) {
        return getBoolean(key, false);
    }

    public int getInt(String key, int defualt) {
        return mPreferences.getInt(key, defualt);
    }

    public int getInt(String key) {
        return getInt(key, 0);
    }

    //Set cache to disk
    public void setCache(String key, Object object) {
        FileOutputStream fos = null;
        try {
            fos = mContext.openFileOutput(key, Context.MODE_PRIVATE);
            ObjectOutputStream oos = null;
            oos = new ObjectOutputStream(fos);
            oos.writeObject(object);
            oos.close();
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //get cache from disk
    public Object getCache(String key) {
        FileInputStream fis = null;
        Object object = null;
        ObjectInputStream ois = null;

        if (!fileExist(key)) {
            return null;
        }
        try {
            fis = mContext.openFileInput(key);
            ois = new ObjectInputStream(fis);
            object = ois.readObject();
        } catch (ClassNotFoundException | IOException e) {
            e.printStackTrace();
        }
        return object;
    }

    private Boolean fileExist(String key) {
        File file = mContext.getFileStreamPath(key);
        Log.v("File", file.toString());
        return file.exists();
    }

    public void clear() {
        try {
            String[] files = mContext.fileList();
            for (int i = 0; i < files.length; i++) {
                String path = mContext.getFilesDir().getAbsolutePath() + "/" + files[i];
                File file = new File(path);
                if (file.exists()) {
                    mContext.deleteFile(files[i]);
                }
            }
        } catch (Exception e) {
        }
        mEditor = mPreferences.edit();
        mEditor.clear();
        mEditor.apply();
    }

    public void clear(String key) {
        String path = mContext.getFilesDir().getAbsolutePath() + "/" + key;
        File file = new File(path);
        if (file.exists()) {
            mContext.deleteFile(key);
        }
    }

    public Context getContext() {
        return this.mContext;
    }
}
