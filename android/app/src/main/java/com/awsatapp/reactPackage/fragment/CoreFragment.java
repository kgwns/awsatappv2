package com.awsatapp.reactPackage.fragment;

import static com.awsatapp.reactPackage.Activity.CoreActivity.hasErrorShowed;

import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.transition.Fade;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.awsatapp.R;
import com.awsatapp.reactPackage.animation.SharedElementImageTransition;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.manager.VisibilityManager;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;

/**
 * Created by Malek Hijazi on 6/13/2016.
 */
public class CoreFragment extends Fragment implements Toolbar.OnMenuItemClickListener {

    public ViewGroup mContainer;
    public Context mContext;
    private int contentView;

    public FragmentManager fm;
    public VisibilityManager vm;
    public CoreCacheManager mCacheManager;

    public CoreFragment() {
        // Required empty public constructor
    }

    /**
     * Set the content view of the fragment by giving it a layout id
     */
    public void setContentView(int layoutId) {
        this.contentView = layoutId;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        mContext = getActivity();
        fm = getActivity().getSupportFragmentManager();
        vm = VisibilityManager.getInstance();
        mCacheManager = CoreCacheManager.getInstance(mContext);


        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        mContainer = container;
        return super.onCreateView(inflater, container, savedInstanceState);
    }

    public void setOptionsMenu(Toolbar tb, int menu) {
        tb.inflateMenu(menu);
        tb.setOnMenuItemClickListener(this);
    }

    public void setBackButtonEnabled(Toolbar tb) {
        setBackButtonEnabled(tb, false);
    }

    public void setBackButtonEnabled(Toolbar tb, boolean blackColor) {
        if (tb != null) {
            Drawable upArrow = ContextCompat.getDrawable(mContext, R.drawable.abc_ic_ab_back_material);
            if (blackColor) {
                upArrow.setColorFilter(ContextCompat.getColor(mContext, android.R.color.black), PorterDuff.Mode.SRC_ATOP);
            } else {
                upArrow.setColorFilter(ContextCompat.getColor(mContext, android.R.color.white), PorterDuff.Mode.SRC_ATOP);
            }
            tb.setNavigationIcon(upArrow);

            tb.setNavigationOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onBackPressed();
                }
            });
        }
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

        ft.add(id, f, f.getClass().getCanonicalName()).addToBackStack(f.getClass().getCanonicalName());
        ft.commit();

    }

    public void showFragment(Fragment f, boolean animated) {
        FragmentTransaction ft = this.fm.beginTransaction();
        if (animated) {
            ft.setCustomAnimations(R.anim.slide_up_fade, R.anim.slide_down_fade, R.anim.slide_up_fade, R.anim.slide_down_fade);
        }
        ft.show(f).addToBackStack(f.getClass().getCanonicalName());
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

    public void replaceFragmentWithBackstack(int id, Fragment f, boolean animated) {
        FragmentTransaction ft = this.fm.beginTransaction();
        if (animated) {
            ft.setCustomAnimations(R.anim.slide_up_fade, R.anim.slide_down_fade, R.anim.slide_up_fade, R.anim.slide_down_fade);
        }
        if (f.getTag() != null) {
            ft.replace(id, f);
        } else {
            ft.replace(id, f, f.getClass().getCanonicalName()).addToBackStack(f.getClass().getCanonicalName());
            ;
        }
        ft.commit();
    }

    public String getString(EditText editText) {
        if (editText != null) {
            return editText.getText().toString();
        }
        return null;
    }

    /**
     * Open Fragment with shared element transition
     *
     * @param id             id of frame layout
     * @param f              fragment to open
     * @param transitionView the view to transition
     * @param position       the position of the transitioned view (The same as the one passed to the opened fragment
     *                       to set the same transition name to the view inside the opened fragment)
     */
    public void openFragment(int id, Fragment f, View transitionView, int position) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            f.setEnterTransition(new Fade());
            f.setSharedElementEnterTransition(new SharedElementImageTransition());
            setExitTransition(new Fade());
            f.setSharedElementReturnTransition(new SharedElementImageTransition());
        }

        getActivity().getSupportFragmentManager()
                .beginTransaction()
                .addSharedElement(transitionView, "sharedImage" + position)
                .replace(id, f)
                .addToBackStack(f.getClass().getCanonicalName())
                .commit();
    }

    public void removeFragment(int id, Fragment f, boolean animated) {
        FragmentTransaction ft = this.fm.beginTransaction();
        if (animated) {
            ft.setCustomAnimations(R.anim.slide_up_fade, R.anim.slide_down_fade, R.anim.slide_up_fade, R.anim.slide_down_fade);
        }
        ft.remove(f);
        ft.commit();
    }

    /**
     * Start a new activity
     *
     * @param clazz The class that should be opened
     */

    public void startActivity(Class clazz) {
        startActivity(clazz, null);
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
        Activity activity = getActivity();
        startActivity(intent);
        if (closePrev) {
            activity.finish();
        }
    }

    public void startActivityAndClear(Class clazz) {
        Intent i = new Intent(mContext, clazz);
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(i);
    }

    public void onBackPressed() {
        getActivity().onBackPressed();
    }

    @Override
    public boolean onMenuItemClick(MenuItem item) {
        return false;
    }

    private static final Field sChildFragmentManagerField;

    static {
        Field f = null;
        try {
            f = Fragment.class.getDeclaredField("mChildFragmentManager");
            f.setAccessible(true);
        } catch (NoSuchFieldException e) {
            Log.e("FM", "Error getting mChildFragmentManager field", e);
        }
        sChildFragmentManagerField = f;
    }



    public void handleError(Exception e) {
        if (!isAdded()) {
            return;
        }
        if (e.getMessage() == null && !hasErrorShowed) {
            hasErrorShowed = true;
            final AlertDialog.Builder builder =
                    new AlertDialog.Builder(getActivity());
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
                    hasErrorShowed = false;
                }
            });
            builder.create().show();

            return;
        }
        try {
            if (hasErrorShowed)
                return;
            JSONObject jsonObject = new JSONObject(e.getMessage());
            hasErrorShowed = true;
            final AlertDialog.Builder builder =
                    new AlertDialog.Builder(getActivity());
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
                    hasErrorShowed = false;
                }
            });
            builder.create().show();

        } catch (JSONException e1) {
            e1.printStackTrace();
        }
    }
}
