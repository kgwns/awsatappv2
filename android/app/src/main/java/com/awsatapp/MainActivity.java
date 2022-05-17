package com.awsatapp;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;

import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.MyContextWrapper;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

import java.util.Locale;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(null);
  }

  @Override
  protected void onResume() {
    super.onResume();
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
