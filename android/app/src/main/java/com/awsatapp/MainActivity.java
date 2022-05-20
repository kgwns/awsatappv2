package com.awsatapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.Configuration;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatDelegate;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.MyContextWrapper;
import com.awsatapp.reactPackage.listener.ThemeChangeEvent;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

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
    SplashScreen.show(this);
    registerReceiver(broadcastReceiver, new IntentFilter("custom-action-local-broadcast"));
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

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Awsatapp";
  }
}
