/*
 * Copyright (c)
 * Copyright (C) 2018. Codeline Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Malek Hijazi<malek.hijazii@gmail.com>, 2018
 *
 */

package com.awsatapp.reactPackage.view;
import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;

import androidx.viewpager.widget.ViewPager;

/**
 * Created by Malek Hijazi on 6/13/2016.
 */
public class NonSwipeableViewPager extends ViewPager {

    private boolean swipable = false;

    public NonSwipeableViewPager(Context context) {
        super(context);
    }

    public NonSwipeableViewPager(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    /**
     * Enable swiping on viewpager
     */
    public void enableSwipe() {
        this.swipable = true;
    }

    /**
     * Disable swiping on viewpager
     */
    public void disableSwipe() {
        this.swipable = false;
    }

    /**
     * @return swipable boolean
     */
    public boolean isSwipable() {
        return this.swipable;
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (this.swipable) {
            return super.onTouchEvent(event);
        }

        return false;
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent event) {
        if (this.swipable) {
            return super.onInterceptTouchEvent(event);
        }

        return false;
    }

}