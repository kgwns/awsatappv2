package com.awsatapp.reactPackage.listener;

import android.util.Log;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 19/05/22
 */
public class ThemeChangeEvent {
    private OnThemeChangeListener onThemeChangeListener;
    public ThemeChangeEvent(OnThemeChangeListener onThemeChangeListener){
        this.onThemeChangeListener = onThemeChangeListener;
    }

    public void update(String theme){

        Log.d("React Theme", "React theme: " +theme);
        onThemeChangeListener.onChange(theme);

    }
}
