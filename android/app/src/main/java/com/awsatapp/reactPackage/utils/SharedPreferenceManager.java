package com.awsatapp.reactPackage.utils;

import android.content.Context;
import android.content.SharedPreferences;

import com.awsatapp.reactPackage.model.Pdf;
import com.google.gson.Gson;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 20/06/22
 */
public class SharedPreferenceManager {

    // save data in sharedPrefences
    public static void saveSharedOBJECT(Context context, String key,
                                       Object value) {

        SharedPreferences sharedPreferences =  context.getSharedPreferences(
                context.getPackageName(), Context.MODE_PRIVATE);

        SharedPreferences.Editor prefsEditor = sharedPreferences.edit();
        Gson gson = new Gson();
        String json = gson.toJson(value);
        prefsEditor.putString(key, json);
        prefsEditor.apply();
    }

    // get data from sharedPrefences
    public static Pdf getSharedOBJECT(Context context, String key) {

        SharedPreferences sharedPreferences = context.getSharedPreferences(
                context.getPackageName(), Context.MODE_PRIVATE);

        Gson gson = new Gson();
        String json = sharedPreferences.getString(key, "");
        Object obj = gson.fromJson(json, Object.class);
        if(obj!=null){
            return new Gson().fromJson(obj.toString(), Pdf.class);
        }else
            return null;

    }
}
