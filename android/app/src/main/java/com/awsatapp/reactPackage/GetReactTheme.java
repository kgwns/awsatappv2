package com.awsatapp.reactPackage;

import androidx.annotation.NonNull;

import com.awsatapp.reactPackage.listener.OnThemeChangeListener;
import com.awsatapp.reactPackage.listener.ThemeChangeEvent;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
