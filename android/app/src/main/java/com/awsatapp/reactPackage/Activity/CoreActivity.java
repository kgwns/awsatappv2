package com.awsatapp.reactPackage.Activity;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;

import android.view.MenuItem;
import android.view.View;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.awsatapp.R;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.MyContextWrapper;
import com.awsatapp.reactPackage.manager.VisibilityManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Locale;

/**
 * Created by Malek Hijazi on 1/14/2016.
 */
public class CoreActivity extends AppCompatActivity implements Toolbar.OnMenuItemClickListener {

    public static boolean hasErrorShowed = false;
    private static boolean isShowing = false;

    public Context mContext;
    public CoreCacheManager mCacheManager;
    public VisibilityManager vm;
    public FragmentManager fm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.fm = this.getSupportFragmentManager();
        this.mContext = getApplicationContext();
        this.mCacheManager = CoreCacheManager.getInstance(getApplicationContext());
        this.vm = VisibilityManager.getInstance();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem menuItem) {

        switch (menuItem.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                break;
        }
        return super.onOptionsItemSelected(menuItem);
    }

    public void setBackButtonEnabled(Toolbar tb) {
        setBackButtonEnabled(tb, true);
    }

    public void setBackButtonEnabled(Toolbar tb, boolean blackColor) {
        if (tb != null) {
            Context context = MyContextWrapper.wrap(mContext, new Locale(CoreCacheManager.getInstance(mContext).get(Constant.CACHE_LANGUAGE, "ar")));
            Drawable upArrow = ContextCompat.getDrawable(context, R.drawable.ic_back);
//            if (blackColor) {
//                upArrow.setColorFilter(ContextCompat.getColor(context, android.R.color.black), PorterDuff.Mode.SRC_ATOP);
//            } else {
//                upArrow.setColorFilter(ContextCompat.getColor(context, android.R.color.white), PorterDuff.Mode.SRC_ATOP);
//            }
            tb.setNavigationIcon(upArrow);

            tb.setNavigationOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onBackPressed();
                }
            });
        }
    }

    public void setTitle(Toolbar tb, String title) {
        if (tb != null && title != null) {
            tb.setTitle(title);
        }
    }

    public void setOptionsMenu(Toolbar tb, int menu) {
        tb.inflateMenu(menu);
        tb.setOnMenuItemClickListener(this);
    }


    public void openFragment(int id, Fragment f) {
        this.openFragment(id, f, true);
    }

    public void openFragment(int id, Fragment f, Bundle args) {
        f.setArguments(args);
        this.openFragment(id, f);
    }

    public void openFragment(int id, Fragment f, boolean animated) {
        FragmentTransaction ft = this.fm.beginTransaction();
        if (animated) {
            ft.setCustomAnimations(R.anim.slide_up_fade, R.anim.slide_down_fade, R.anim.slide_up_fade, R.anim.slide_down_fade);
        }

        ft.add(id, f, f.getClass().getCanonicalName()).addToBackStack(Integer.toString(this.fm.getBackStackEntryCount()));
        ft.commit();
    }

    public void replaceFragment(int id, Fragment f, boolean animated) {
        FragmentTransaction ft = this.fm.beginTransaction();
        if (animated) {
            ft.setCustomAnimations(R.anim.slide_up_fade, R.anim.slide_down_fade, R.anim.slide_up_fade, R.anim.slide_down_fade);
        }
        if (f.getTag() != null) {
            ft.replace(id, f);
        } else {
            ft.replace(id, f, f.getClass().getCanonicalName());
        }
        ft.commit();
    }

    public void removeFragment(int id, Fragment f, boolean animated) {
        FragmentTransaction ft = this.fm.beginTransaction();
        if (animated) {
            ft.setCustomAnimations(R.anim.slide_up_fade, R.anim.slide_down_fade, R.anim.slide_up_fade, R.anim.slide_down_fade);
        }
        ft.remove(f);
        ft.commit();
    }

    public void startActivity(Class clazz) {
        startActivity(clazz, null);
    }

    public void startActivityAndClear(Class clazz) {
        Intent i = new Intent(this, clazz);
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(i);
    }

    public void startActivity(Class clazz, boolean closePrev) {
        startActivity(clazz, null, closePrev);
    }

    public void startActivity(Class clazz, Bundle args) {
        startActivity(clazz, args, false);
    }

    public void startActivity(Class clazz, Bundle args, boolean closePrev) {
        Intent intent = new Intent(mContext, clazz);
        if (args != null) {
            intent.putExtras(args);
        }
        startActivity(intent);
        if (closePrev) {
            finish();
        }
    }

    public void setStatusBarTransparent() {

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                getWindow().setStatusBarColor(ContextCompat.getColor(mContext, android.R.color.transparent));
            }

        }
    }


    @Override
    public boolean onMenuItemClick(MenuItem item) {
        return false;
    }

    @Override
    protected void attachBaseContext(Context base) {
        Context context = MyContextWrapper.wrap(base, new Locale(CoreCacheManager.getInstance(base).get(Constant.CACHE_LANGUAGE, "ar")));
        super.attachBaseContext(context);
    }

    public void handleError(Exception e) {
        if(isDestroyed()){
            return;
        }
        if (e.getMessage() == null && !hasErrorShowed) {
            hasErrorShowed = true;
            final AlertDialog.Builder builder =
                    new AlertDialog.Builder(this);
            builder.setTitle(getString(R.string.error)).setMessage(getString(R.string.check_internet))
                    .setPositiveButton(getString(R.string.ok), new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            hasErrorShowed = false;

                        }
                    });
            builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
                @Override
                public void onDismiss(DialogInterface dialog) {
                    CoreActivity.hasErrorShowed = false;
                }
            });
            if(!isDestroyed()) {
                builder.create().show();
            }

            return;
        }
        try {
            if (hasErrorShowed)
                return;
            JSONObject jsonObject = new JSONObject(e.getMessage());
            hasErrorShowed = true;
            final AlertDialog.Builder builder =
                    new AlertDialog.Builder(this);
            builder.setTitle(getString(R.string.error)).setMessage(jsonObject.getString("message"))
                    .setPositiveButton(getString(R.string.ok), new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            hasErrorShowed = false;

                        }
                    });
            builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
                @Override
                public void onDismiss(DialogInterface dialog) {
                    CoreActivity.hasErrorShowed = false;
                }
            });
            builder.create().show();

        } catch (JSONException e1) {
            e1.printStackTrace();
        }
    }
}
