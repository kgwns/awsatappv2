package com.awsatapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatDelegate;

import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.MyContextWrapper;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import java.util.Locale;
import java.util.Objects;

public class MainActivity extends ReactActivity{
  private final BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
    // we will receive data updates in onRecieve method.
    @Override
    public void onReceive(Context context, Intent intent) {
      String themeData = intent.getStringExtra("theme");
      if(Objects.equals(themeData, "light")){
        AppCompatDelegate.setDefaultNightMode( AppCompatDelegate.MODE_NIGHT_NO);
      }else if(Objects.equals(themeData, "dark")){
        AppCompatDelegate.setDefaultNightMode( AppCompatDelegate.MODE_NIGHT_YES);
      }else{
        AppCompatDelegate.setDefaultNightMode( AppCompatDelegate.MODE_NIGHT_NO);
      }
    }

  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
//    SplashScreen.show(this);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      registerReceiver(broadcastReceiver, new IntentFilter("custom-action-local-broadcast"), Context.RECEIVER_NOT_EXPORTED);
    }
    super.onCreate(null);

  }

  @Override
  protected void onResume() {
    super.onResume();

  }

  @Override
  protected void onDestroy() {
    unregisterReceiver(broadcastReceiver);
    super.onDestroy();
  }

  @Override
  protected void attachBaseContext(Context base) {
    Context context = MyContextWrapper.wrap(base, new Locale(CoreCacheManager.getInstance(base).get(Constant.CACHE_LANGUAGE, "ar")));
    super.attachBaseContext(context);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }

  @Override
    public void invokeDefaultOnBackPressed() {
        // do not call super. invokeDefaultOnBackPressed() as it will close the app.  Instead lets just put it in the background.
        moveTaskToBack(true);
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Awsatapp";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
}