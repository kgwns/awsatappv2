package com.awsatapp.reactPackage;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.awsatapp.MainActivity;
import com.awsatapp.reactPackage.fragment.DownloadNewsFragment;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 17/05/22
 */
public class DownloadNewsViewManager  extends SimpleViewManager<FrameLayout>{
    public final int DOWNLOAD_NEWS  = 2;
    ReactApplicationContext reactContext;

    private String theme;
    private int screenWidth;
    private int propWidth;
    private int propHeight;

    public DownloadNewsViewManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;

    }
    @NonNull
    @Override
    public String getName() {
    return "DownloadNewsViewManager";
}

    @NonNull
    @Override
    protected FrameLayout createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new FrameLayout(reactContext);
    }

        @Override
        public void receiveCommand(@NonNull FrameLayout root, String commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        int reactNativeViewId = args.getInt(0);
        int commandIdInt = Integer.parseInt(commandId);
        switch (commandIdInt) {
            case DOWNLOAD_NEWS:
                createDownloadNewsFragment(root, reactNativeViewId);
                break;
            default: {}
        }
    }

    @ReactProp(name = "userTheme")
    public void setUserTheme(FrameLayout view, @Nullable String themeData) {
        Intent intent = new Intent("custom-action-local-broadcast");
        intent.putExtra("theme", themeData);
        reactContext.sendBroadcast(intent);
        this.theme = themeData;
    }

    @ReactProp(name = "screenWidth")
    public void setScreenWidth(FrameLayout view, @Nullable int screenWidth) {
        Intent intent = new Intent("custom-action-local-broadcast");
        intent.putExtra("screenWidth", screenWidth);
        reactContext.sendBroadcast(intent);
        this.screenWidth = screenWidth;
    }

    @ReactPropGroup(names = {"width", "height"}, customType = "Style")
    public void setStyle(FrameLayout view, int index, Integer value) {
        if (index == 0) {
            propWidth = value;
        }

        if (index == 1) {
            propHeight = value;
        }
    }

    public static boolean isTablet(Context context) {
        Configuration config = context.getResources().getConfiguration();
        int screenSize = config.screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK;
        return screenSize >= Configuration.SCREENLAYOUT_SIZE_LARGE;
    }

    public void createDownloadNewsFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
        setupLayout(parentView);
        Bundle bundle = new Bundle();
        bundle.putString("theme",this.theme);
        final DownloadNewsFragment downloadNewsFragment = new DownloadNewsFragment();
        downloadNewsFragment.setScreenWidth(screenWidth);
        downloadNewsFragment.setArguments(bundle);
        MainActivity activity = (MainActivity) reactContext.getCurrentActivity();
        if(isTablet(reactContext)) {
            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
        }

        activity.getSupportFragmentManager()
                .beginTransaction()
                .replace(reactNativeViewId, downloadNewsFragment, String.valueOf(reactNativeViewId))
                .commit();
    }

        public void setupLayout(View view) {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                manuallyLayoutChildren(view);
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }

        /**
         * Layout all children properly
         */
        public void manuallyLayoutChildren(View view) {
        // propWidth and propHeight coming from react-native props
        int width = propWidth;
        int height = propHeight;


            if (isTablet(reactContext)) {
                // Get the window manager service
                WindowManager wm = null;
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                    wm = (WindowManager) view.getContext().getSystemService(Context.WINDOW_SERVICE);

                    if (isTablet(reactContext)) {
                        // Get the display metrics of the default display
                        DisplayMetrics metrics = new DisplayMetrics();
                        wm.getDefaultDisplay().getMetrics(metrics);

                        // Get the screen width and height
                        width = metrics.widthPixels;
                        height = metrics.heightPixels;
                    }
                }
            }

        view.measure(
                View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));

        view.layout(0, 0, width, height);
    }
}
