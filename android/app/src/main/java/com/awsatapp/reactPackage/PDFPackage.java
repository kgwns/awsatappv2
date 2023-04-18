package com.awsatapp.reactPackage;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 12/05/22
 */

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class PDFPackage implements ReactPackage {


    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new PDFViewManager(reactContext),
                new DownloadNewsViewManager(reactContext)
        );
    }

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(
            @NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new GetReactTheme());
        modules.add(new PDFViewListener(reactContext));
        return modules;
    }


}
