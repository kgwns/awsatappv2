package com.awsatapp.reactPackage.manager;

import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.EditText;

import com.awsatapp.R;


/**
 * Created by Malek Hijazi on 3/8/2016.
 */
public class VisibilityManager {

    private static VisibilityManager mInstance;

    public static synchronized VisibilityManager getInstance() {
        if (mInstance == null) {
            mInstance = new VisibilityManager();

        }
        return mInstance;
    }

    /**
     * Hides the view passed in parameters without animation and to {@link View#GONE}
     *
     * @param view view to hide
     */
    public void hide(View view) {
        hide(view, false, false);
    }

    /**
     * Hides the view passed in parameters with defailt shrink animation based on {@param animated} value.
     * The view visibility is changed to {@link View#GONE} by default.
     * Use {@link #hide(View, boolean, boolean)} to change to {@link View#INVISIBLE} instead of
     * {@link View#GONE}
     *
     * @param view     view to hide
     * @param animated animated or not
     */
    public void hide(View view, boolean animated) {
        hide(view, animated, false);
    }

    /**
     * Hides the view passed in parameters with default shrink animation based on {@param animated} value.
     * The view visibility is changed to {@link View#GONE} if @{param invisible} os false, and to
     * to {@link View#INVISIBLE} if true
     *
     * @param view      view to hide
     * @param animated  animated or not
     * @param invisible if invisible
     */
    public void hide(final View view, boolean animated, final boolean invisible) {
        if (animated)
            hide(view, invisible, R.anim.shrink);
        else
            hide(view, invisible, 0);

    }


    /**
     * Hides the view passed in parameters with custom animation based on {@param animId} value.
     * The view visibility is changed to {@link View#GONE} if @{param invisible} os false, and to
     * to {@link View#INVISIBLE} if true
     *
     * @param view      view to hide
     * @param invisible if it should be invisible
     * @param animId    animation id
     */
    public void hide(final View view, final boolean invisible, int animId) {
        if (view != null && view.getVisibility() == View.VISIBLE) {
            if (animId != 0) {
                Animation animation = AnimationUtils.loadAnimation(view.getContext(), animId);
                animation.setAnimationListener(new Animation.AnimationListener() {
                    @Override
                    public void onAnimationStart(Animation animation) {

                    }

                    @Override
                    public void onAnimationEnd(Animation animation) {
                        if (invisible) {
                            view.setVisibility(View.INVISIBLE);
                        } else {
                            view.setVisibility(View.GONE);
                        }
                    }

                    @Override
                    public void onAnimationRepeat(Animation animation) {

                    }
                });
                view.startAnimation(animation);
            } else {
                if (invisible) {
                    view.setVisibility(View.INVISIBLE);
                } else {
                    view.setVisibility(View.GONE);
                }
            }

        }
    }

    /**
     * Hides all view passed without any animation and changes visibility to {@link View#GONE}
     *
     * @param views views to hide
     */
    public void hide(View... views) {
        for (View view : views) {
            hide(view);
        }
    }

    /**
     * Shows a view without animation
     *
     * @param view view to show
     */
    public void show(View view) {
        show(view, false);
    }


    /**
     * Shows a view with default grow animation
     *
     * @param view     view to show
     * @param animated animation id
     */
    public void show(final View view, boolean animated) {
        if (animated)
            show(view, R.anim.grow);
        else
            show(view, 0);
    }

    /**
     * Shows view with a custom animationId
     *
     * @param view   view to show
     * @param animId animation id
     */
    public void show(final View view, int animId) {
        if (view != null && (view.getVisibility() == View.GONE
                || view.getVisibility() == View.INVISIBLE)) {
            if (animId != 0) {
                Animation animation = AnimationUtils.loadAnimation(view.getContext(), animId);

                animation.setAnimationListener(new Animation.AnimationListener() {
                    @Override
                    public void onAnimationStart(Animation animation) {

                    }

                    @Override
                    public void onAnimationEnd(Animation animation) {
                        view.setVisibility(View.VISIBLE);
                    }

                    @Override
                    public void onAnimationRepeat(Animation animation) {

                    }
                });
                view.startAnimation(animation);
            } else {
                view.setVisibility(View.VISIBLE);
            }
        }
    }

    /**
     * Shows all views passed
     *
     * @param views views to show
     */
    public void show(View... views) {
        for (View view : views) {
            show(view);
        }
    }

    /**
     * Hides a view and shows another
     *
     * @param toHide view to hide
     * @param toShow view to show
     */
    public void hideAndShow(View toHide, View toShow) {
        hide(toHide);
        show(toShow);
    }

    /**
     * Shows a view and hides another
     *
     * @param toShow view to show
     * @param toHide view to hide
     */
    public void showAndHide(View toShow, View toHide) {
        hide(toHide);
        show(toShow);
    }

    /**
     * Toggles a view visibility; shows if hidden, hides if visible
     *
     * @param view view to toggle
     */
    public void toggle(View view) {
        if (view.getVisibility() == View.VISIBLE) {
            hide(view);
        } else {
            show(view);
        }
    }


    /**
     * Shows a view with animation id set to fade in
     *
     * @param view
     */
    public void fadeIn(final View view) {
        show(view, R.anim.fade_in);
    }

    /**
     * Hides a view with animation set to fade out
     *
     * @param view
     */
    public void fadeOut(final View view) {
        hide(view, false, R.anim.fade_out);
    }


    /**
     * This method checks whether the view is visible or hidden
     *
     * @param view the view to check visibility for
     * @return true/false
     */
    public boolean isVisible(View view) {
        if (view.getVisibility() == View.VISIBLE) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Disables views passed into
     *
     * @param editTexts
     */
    public void disable(EditText... editTexts) {
        for (EditText editText : editTexts) {
            if (editText != null) {
                editText.setEnabled(false);
            }
        }
    }

    /**
     * Enable views passed into
     *
     * @param editTexts
     */
    public void enable(EditText... editTexts) {
        for (EditText editText : editTexts) {
            if (editText != null) {
                editText.setEnabled(true);
            }
        }
    }
}
