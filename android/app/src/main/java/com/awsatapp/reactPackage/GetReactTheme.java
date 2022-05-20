package com.awsatapp.reactPackage;

import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.lifecycle.Lifecycle;
import androidx.lifecycle.LifecycleEventObserver;
import androidx.lifecycle.LifecycleOwner;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.awsatapp.MainActivity;
import com.awsatapp.reactPackage.listener.OnThemeChangeListener;
import com.awsatapp.reactPackage.listener.ThemeChangeEvent;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.util.Objects;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 19/05/22
 */
public class GetReactTheme extends ReactContextBaseJavaModule {
    OnThemeChangeListener onThemeChangeListener;
    ThemeChangeEvent themeChangeEvent;
    private String themeData = "Light";
    public GetReactTheme(){

    }

    public GetReactTheme(OnThemeChangeListener onThemeChangeListener) {
        this.onThemeChangeListener = onThemeChangeListener;
    }

    @NonNull
    @Override
    public String getName() {

        return "ReactTheme";
    }

    @ReactMethod
    public void getReactTheme(String theme){
        this.themeData = theme;


//        new Handler(Looper.getMainLooper()).post(new Runnable() {
//            @Override
//            public void run() {
//
//                if(Objects.equals(themeData, "light")){
//                    AppCompatDelegate.setDefaultNightMode( AppCompatDelegate.MODE_NIGHT_NO);
//                }else if(Objects.equals(themeData, "dark")){
//                    AppCompatDelegate.setDefaultNightMode( AppCompatDelegate.MODE_NIGHT_YES);
//                }else{
//                    AppCompatDelegate.setDefaultNightMode( AppCompatDelegate.MODE_NIGHT_NO);
//                }
//
//            }
//        });
    }


}
