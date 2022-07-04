/*
 * Copyright (c)
 * Copyright (C) 2017. Codeline Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Malek Hijazi<malek.hijazii@gmail.com>, 2017
 *
 */

package com.awsatapp.reactPackage.utils;

import android.content.Context;
import android.graphics.Typeface;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.widget.Toolbar;


public class FontUtils {
    public static Typeface getBold(Context context) {
        return Utils.getTypeFace(context, "AwsatDigitalBetav10-Bold.ttf");
    }

    public static Typeface getBlack(Context context) {
        return Utils.getTypeFace(context, "AwsatDigitalBetav10-Black.ttf");

    }

    public static Typeface getLight(Context context) {
        return Utils.getTypeFace(context, "AwsatDigitalBetav10-Regular.ttf");
    }

    public static Typeface getEffraRegular(Context context) {
        return Utils.getTypeFace(context, "Effra-Regular.ttf");
    }

    public static void setBold(Context context, TextView... textViews) {
        Typeface tf = getBold(context);
        for (TextView view : textViews) {
            if (view != null) {
                view.setTypeface(tf);
            }
        }
    }

    public static void setBlack(Context context, TextView... textViews) {
        Typeface tf = getBlack(context);
        for (TextView view : textViews) {
            if (view != null) {
                view.setTypeface(tf);
            }
        }
    }

    public static void setLight(Context context, TextView... textViews) {
        Typeface tf = getLight(context);
        for (TextView view : textViews) {
            if (view != null) {
                view.setTypeface(tf);
            }
        }
    }

    public static void setEffraRegular(Context context, TextView... textViews) {
        Typeface tf = getEffraRegular(context);
        for (TextView view : textViews) {
            if (view != null) {
                view.setTypeface(tf);
            }
        }
    }

    public static void setToolbar(Context context, Toolbar toolbar) {
        for (int i = 0; i < toolbar.getChildCount(); i++) {
            View view = toolbar.getChildAt(i);
            if (view instanceof TextView) {
                TextView tv = (TextView) view;
                if (tv.getText().equals(toolbar.getTitle())) {
                    tv.setTypeface(getBlack(context));
                    break;
                }
            }
        }
    }
}
