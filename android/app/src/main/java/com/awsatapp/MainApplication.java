package com.awsatapp;

import android.app.Application;
import android.content.ComponentCallbacks2;
import android.content.Context;
import android.os.StatFs;
import android.provider.Settings;
import android.widget.Toast;

import com.awsatapp.reactPackage.PDFPackage;
import com.awsatapp.reactPackage.manager.FileDownloadSerialQueue;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.modules.i18nmanager.I18nUtil;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication, ComponentCallbacks2 {
  public static FileDownloadSerialQueue fileDownloadSerialQueue;
    private static MainApplication application;

    public MainApplication getInstance() {
        return application;
    }

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          packages.add(new PDFPackage());
          // packages.add(new com.swmansion.rnscreens.RNScreensPackage());
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
      application = this;
      application.initialize();
      SoLoader.init(this, /* native exopackage */ false);
      I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
      sharedI18nUtilInstance.forceRTL(this,true);
      sharedI18nUtilInstance.allowRTL(this, true);
      checkForLowStorage();
  }

    @Override
    public void onTrimMemory(int level) {
        super.onTrimMemory(level);
        switch (level) {

            case ComponentCallbacks2.TRIM_MEMORY_UI_HIDDEN:

                /*
                   Release any UI objects that currently hold memory.

                   The user interface has moved to the background.
                */

                break;

            case ComponentCallbacks2.TRIM_MEMORY_RUNNING_MODERATE:
            case ComponentCallbacks2.TRIM_MEMORY_RUNNING_LOW:
            case ComponentCallbacks2.TRIM_MEMORY_RUNNING_CRITICAL:

                /*
                   Release any memory that your app doesn't need to run.

                   The device is running low on memory while the app is running.
                   The event raised indicates the severity of the memory-related event.
                   If the event is TRIM_MEMORY_RUNNING_CRITICAL, then the system will
                   begin killing background processes.
                */

                break;

            case ComponentCallbacks2.TRIM_MEMORY_BACKGROUND:
            case ComponentCallbacks2.TRIM_MEMORY_MODERATE:
            case ComponentCallbacks2.TRIM_MEMORY_COMPLETE:

                /*
                   Release as much memory as the process can.

                   The app is on the LRU list and the system is running low on memory.
                   The event raised indicates where the app sits within the LRU list.
                   If the event is TRIM_MEMORY_COMPLETE, the process will be one of
                   the first to be terminated.
                */

                break;

            default:
                Toast.makeText(this, R.string.low_storage_error_message, Toast.LENGTH_LONG).show();
                break;
        }
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
    }

    private void checkForLowStorage() {
        long mFreeMem = getDeviceCurrentStorage();
        float deviceLowStorageThreshold = getDeviceLowStorageThreshold();
        if (mFreeMem <= deviceLowStorageThreshold) {
            Toast.makeText(this, R.string.low_storage_error_message, Toast.LENGTH_LONG).show();
            // Handle storage low state
        } else {
            // Handle storage ok state
        }
    }

    private long getDeviceCurrentStorage() {

        long mFreeMem = 0;
        try {
            StatFs mDataFileStats = new StatFs("/data");
            mDataFileStats.restat("/data");
            mFreeMem = (long) mDataFileStats.getAvailableBlocksLong() *
                    mDataFileStats.getBlockSizeLong();
        } catch (IllegalArgumentException e) {
            // use the old value of mFreeMem
        }
        return mFreeMem;
    }

    private long getDeviceLowStorageThreshold() {

        long value = Settings.Secure.getInt(
                getContentResolver(),
                "sys_storage_threshold_percentage",
                10);
        StatFs mDataFileStats = new StatFs("/data");
        long mTotalMemory = ((long) mDataFileStats.getBlockCountLong() *
                mDataFileStats.getBlockSizeLong()) / 100L;
        value *= mTotalMemory;
        long maxValue = Settings.Secure.getInt(
                getContentResolver(),
                "sys_storage_threshold_max_bytes",
                500*1024*1024);
        return Math.min(value, maxValue);
    }

  public void initialize(){
      fileDownloadSerialQueue = new FileDownloadSerialQueue();
  }
    public FileDownloadSerialQueue getPDFDownloadService() {
        return fileDownloadSerialQueue;
    }
}
