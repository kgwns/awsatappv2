package com.awsatapp.reactPackage;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 16/05/22
 */
public class RenderPDF extends ReactContextBaseJavaModule {
    @NonNull
    @Override
    public String getName() {
        return "RenderPDF";
    }

    @ReactMethod
    public void renderPDF(String data){
        Log.d("CalendarModule", "Create event called with name: " +data);

    }
}
