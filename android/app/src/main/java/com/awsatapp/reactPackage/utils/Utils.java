package com.awsatapp.reactPackage.utils;

import android.animation.ValueAnimator;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Build;
import android.util.DisplayMetrics;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewTreeObserver;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;

import androidx.appcompat.app.AlertDialog;
import androidx.core.content.ContextCompat;
import com.google.android.material.snackbar.Snackbar;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.MonthDay;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DecimalStyle;
import java.time.temporal.TemporalAccessor;
import java.util.Date;
import java.util.Locale;
import java.util.Random;

/**
 * Created by Malek Hijazi on 4/22/2016.
 */
public class Utils {

    public static void setStatusBarColor(Activity activity, int color) {

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            final Window window = activity.getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            ValueAnimator colorAnimation = ValueAnimator.ofArgb(window.getStatusBarColor(), color);
            colorAnimation.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {

                @Override
                public void onAnimationUpdate(ValueAnimator animator) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        window.setStatusBarColor((Integer) animator.getAnimatedValue());
                    }
                }

            });
            colorAnimation.start();
        }
    }

    public static int getStatusBarColor(Activity activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            final Window window = activity.getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            return window.getStatusBarColor();
        }
        return -1;
    }

    /**
     * @param originalColor color, without alpha
     * @param alpha         from 0.0 to 1.0
     * @return
     */
    public static String addAlpha(String originalColor, double alpha) {
        long alphaFixed = Math.round(alpha * 255);
        String alphaHex = Long.toHexString(alphaFixed);
        if (alphaHex.length() == 1) {
            alphaHex = "0" + alphaHex;
        }
        originalColor = originalColor.replace("#", "#" + alphaHex);


        return originalColor;
    }

    public static String getTimestamp() {
        Long timeStamp = System.currentTimeMillis() / 1000;
        String ts = timeStamp.toString();
        return ts;
    }

    public static String getDurationFromMilliSeconds(long ms) {
        String out = null;
        long hours = 0;
        try {
            hours = (ms / 3600000);
        } catch (Exception e) {
            e.printStackTrace();
            return out;
        }
        long remaining_minutes = (ms - (hours * 3600000)) / 60000;
        String minutes = String.valueOf(remaining_minutes);
        if (minutes.equals(0)) {
            minutes = "00";
        }
        long remaining_seconds = (ms - (hours * 3600000) - (remaining_minutes * 60000));
        String seconds = String.valueOf(remaining_seconds);
        if (seconds.length() < 2) {
            seconds = "00";
        } else {
            seconds = seconds.substring(0, 2);
        }

        if (hours > 0) {
            out = hours + ":" + minutes + ":" + seconds;
        } else {
            out = minutes + ":" + seconds;
        }

        return out;
    }

    public static String getRandomString(int number) {
        String AB = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(number);
        for (int i = 0; i < number; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }


    public static String getDate() {
        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        return date;
    }

    public static int dpToPx(int dp) {
        return (int) (dp * Resources.getSystem().getDisplayMetrics().density);
    }

    public static int pxToDp(int px) {
        return (int) (px / Resources.getSystem().getDisplayMetrics().density);
    }

    public static int spToPx(float sp, Context context) {
        int px = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_SP, sp, context.getResources().getDisplayMetrics());
        return px;
    }

    public static void closeKeyboard(Activity activity) {
        if (activity != null) {
            View view = activity.getCurrentFocus();
            if (view != null) {
                InputMethodManager imm = (InputMethodManager) activity.getSystemService(Context.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
            }
        }
    }

    public static AlertDialog showAlertDialog(Context context, String title, String message) {
        return showAlertDialog(context, title, message, "Ok");
    }

    public static AlertDialog showAlertDialog(Context context, String title, String message, String positive) {
        return showAlertDialog(context, title, message, positive, true);
    }

    public static AlertDialog showAlertDialog(Context context, String title, String message, String positive,
                                              boolean cancelable) {
        return showAlertDialog(context, title, message, positive, true, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.dismiss();
            }
        });
    }

    public static AlertDialog showAlertDialog(Context context, String title, String message, String positive,
                                              String negative, boolean cancelable, DialogInterface.OnClickListener positiveListener, DialogInterface.OnClickListener negativeListener) {
        if (context != null) {
            final AlertDialog.Builder builder =
                    new AlertDialog.Builder(context);
            builder.setTitle(title).setMessage(message)
                    .setPositiveButton(positive, positiveListener)
                    .setNegativeButton(negative, negativeListener)
                    .setCancelable(cancelable);
            AlertDialog dialog = builder.create();
            dialog.show();
            return dialog;
        }
        return null;
    }

    public static AlertDialog showAlertDialog(Context context, String title, String message, String positive,
                                              boolean cancelable, DialogInterface.OnClickListener listener) {
        final AlertDialog.Builder builder =
                new AlertDialog.Builder(context);
        builder.setTitle(title).setMessage(message)
                .setPositiveButton(positive, listener)
                .setCancelable(cancelable);
        AlertDialog dialog = builder.create();
        dialog.show();
        return dialog;
    }

    public static void snack(Context context, View view, String message, int duration) {
        try {
            if (view != null) {
                Snackbar.make(view, message, duration).show();
            } else if (context != null) {
                showAlertDialog(context, "Error", message);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void removeGlobalLayoutListener(View view, ViewTreeObserver.OnGlobalLayoutListener listener) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN) {
            view.getViewTreeObserver().removeGlobalOnLayoutListener(listener);
        } else {
            view.getViewTreeObserver().removeOnGlobalLayoutListener(listener);
        }
    }

    public static int getDisplayWidth(Context activity) {
        DisplayMetrics displayMetrics = new DisplayMetrics();
        ((Activity) activity).getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);

        return displayMetrics.widthPixels;
    }

    public static int getDisplayHeight(Activity activity) {
        DisplayMetrics displayMetrics = new DisplayMetrics();
        activity.getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);

        return displayMetrics.heightPixels;
    }

    public static Typeface getTypeFace(Context context, String fontName) {
        return Typeface.createFromAsset(context.getAssets(), "fonts/"+fontName);

    }

    public static String getErrorMessage(String json) {
        try {
            JSONObject object = new JSONObject(json);
            return object.getJSONObject("error").getString("message");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return "";
    }

    public static void setBackground(Context contex, View view, int id) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            view.setBackground(ContextCompat.getDrawable(contex, id));
        } else {
            view.setBackgroundDrawable(ContextCompat.getDrawable(contex, id));
        }
    }

    public static void setBackground(Context contex, View view, Drawable drawable) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            view.setBackground(drawable);
        } else {
            view.setBackgroundDrawable(drawable);
        }
    }

    public static String getTimeString(int seconds) {
        int hours = 0;
        int minutes = 0;
        int remaining = 0;

        if (seconds >= 3600) {
            hours = seconds / 3600;
        }
        remaining = seconds - (hours * 3600);
        if (remaining >= 60) {
            minutes = remaining / 60;
        }
        remaining = remaining - (minutes * 60);

        String hoursString = hours + ":";
        String minString = minutes + ":";
        String secString = remaining + "";
        if (hours == 0) {
            hoursString = "";
        } else if (hours < 10) {
            hoursString = "0" + hours + ":";
        }
        if (minutes == 0) {
            minString = "";
        } else if (minutes < 10) {
            minString = "0" + minutes + ":";
        }
        if (remaining < 10) {
            secString = "0" + remaining;
        }
        return hoursString + minString + secString;
    }

    public static String calculateTimeAgoWithFullText(String lang, long timeStamp) {

        long timeDiffernce;
        long unixTime = System.currentTimeMillis() / 1000L;  //get current time in seconds.
        int j;

        // you may choose to write full time intervals like seconds, minutes, days and so on
        double[] lengths = {60, 60, 24, 7, 4.35, 12, 10};
        timeDiffernce = unixTime - timeStamp;
        for (j = 0; timeDiffernce >= lengths[j] && j < lengths.length - 1; j++) {
            timeDiffernce /= lengths[j];
        }
        String time = "";
        if (lang.equals("ar")) {
            String[] period = {" ثانية", " دقيقة ", " ساعة", " يوم", " أسبوع", " شهر", " عام", " عقد"};
            String[] periods = {" ثواني", " دقائق ", " ساعات", " أيام", " أسابيع", " أشهر", " سنوات", " عقود"};
            if (timeDiffernce == 1) {
                time = period[j];
            } else {
                time = periods[j];
            }
        } else {
            String[] period = {" second", " minute", " hour", " day", " week", " month", " year", " decade"};
            String[] periods = {" seconds", " minutes", " hours", " days", " weeks", " months", " years", " decades"};
            if (timeDiffernce == 1) {
                time = period[j];
            } else {
                time = periods[j];
            }
        }
        if (timeDiffernce > 0) {
            if (timeDiffernce == 1) {
                if (lang.equals("en")) {
                    return timeDiffernce + time + " ago";
                }
                return "منذ" + time;
            }
            if (lang.equals("en")) {
                return timeDiffernce + time + " ago";
            }
            return "منذ" + timeDiffernce + time;
        } else {
            return 0 + time;
        }
    }

    public static String getFullDateFromTimestamp(Locale locale, long timeStamp) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                DateFormat sdf = new SimpleDateFormat("EEE, d MMM, yyyy",Locale.ENGLISH);
                Date netDate = (new Date(timeStamp * 1000L));
                 String date = sdf.format(netDate);
                DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                        .parseCaseInsensitive()
                        .append(DateTimeFormatter.ofPattern("EEE, d MMM, yyyy"))
                        .toFormatter(Locale.ENGLISH);

                MonthDay monthDay = MonthDay.parse(date, formatter);
                LocalDate parsedDate = monthDay.atYear(netDate.getYear()+1900);
                DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("EEE, d MMM, yyyy",locale)
                        .withDecimalStyle(DecimalStyle.of(new Locale("en")));
                return parsedDate.format(formatter1);
            }else{
                DateFormat sdf = new SimpleDateFormat("EEE, d MMM, yyyy", locale);
                Date netDate = (new Date(timeStamp * 1000L));
                return sdf.format(netDate);
            }

        } catch (Exception ex) {
            return "xx";
        }
    }

    public static String getDateAndTimeInNumbers(Locale locale, long timeStamp) {
        try {
            DateFormat sdf = new SimpleDateFormat("EEE, d MMM, yyyy", locale);
            Date netDate = (new Date(timeStamp * 1000L));
            return sdf.format(netDate);
        } catch (Exception ex) {
            return "xx";
        }
    }

    public static void openUrl(Context context, String url) {
        if (url == null || url.equals("")) {
            return;
        }
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        context.startActivity(intent);
    }
}
