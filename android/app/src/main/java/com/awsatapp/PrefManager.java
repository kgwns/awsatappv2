package com.awsatapp;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

public class PrefManager {
    private static final String KEY_IS_SPLASH_IN = "isSplashScreenIn";
    private static final String PREF_NAME = "SplashScreen";

    SharedPreferences pref;
    // Editor for Shared preferences
    Editor editor;
    // Context
    Context _context;
    // Shared pref mode
    int PRIVATE_MODE = 0;

    public PrefManager(Context context) {
        this._context = context;
        pref = _context.getSharedPreferences(PREF_NAME, PRIVATE_MODE);
        editor = pref.edit();
    }

    public boolean isSplashIn() {
        return pref.getBoolean(KEY_IS_SPLASH_IN, false);
    }

    public void setSplashIn(boolean setSplashIn) {
        editor.putBoolean(KEY_IS_SPLASH_IN, setSplashIn);
        editor.commit();
    }
}
