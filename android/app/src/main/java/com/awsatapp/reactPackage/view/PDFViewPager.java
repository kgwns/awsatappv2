/*
 * Copyright (c)
 * Copyright (C) 2017. Codeline Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Malek Hijazi<malek.hijazii@gmail.com>, 2017
 *
 */
package com.awsatapp.reactPackage.view;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.view.MotionEvent;

import androidx.viewpager.widget.ViewPager;

import com.awsatapp.R;

public class PDFViewPager extends ViewPager {
    protected Context context;

    public PDFViewPager(Context context, String pdfPath) {
        super(context);
        this.context = context;
        init(pdfPath);
    }

    public PDFViewPager(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.context = context;
        init(attrs);
    }

    protected void init(String pdfPath) {
        initAdapter(context, pdfPath);
    }

    protected void init(AttributeSet attrs) {
        if (isInEditMode()) {
            setBackgroundResource(R.drawable.flaticon_pdf_dummy);
            return;
        }

        if (attrs != null) {
            TypedArray a;

            a = context.obtainStyledAttributes(attrs, R.styleable.PDFViewPager);
            String assetFileName = a.getString(R.styleable.PDFViewPager_assetFileName);

            if (assetFileName != null && assetFileName.length() > 0) {
                initAdapter(context, assetFileName);
            }

            a.recycle();
        }
    }

    protected void initAdapter(Context context, String pdfPath) {
        setAdapter(new PDFPagerAdapter.Builder(context)
                .setPdfPath(pdfPath)
                .setOffScreenSize(3)
                .create());
    }

    /**
     * PDFViewPager uses PhotoView, so this bugfix should be added
     * Issue explained in https://github.com/chrisbanes/PhotoView
     */
    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        try {
            return super.onInterceptTouchEvent(ev);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return false;
        }
    }
}
