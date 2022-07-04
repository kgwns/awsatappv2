package com.awsatapp.reactPackage.utils;

import android.content.res.Resources;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.view.View;
import androidx.recyclerview.widget.RecyclerView;

import com.awsatapp.R;

/**
 * Copyright (C) 2016 Mtech.mobi. All rights reserved.
 * Created by Malek on 12/23/16.
 */

public class SimpleDividerItemDecoration extends RecyclerView.ItemDecoration {
    private Drawable mDivider;
    private int cols = 0;
    private int startIndex = 0;

    public SimpleDividerItemDecoration(Resources resources) {
        this(resources, 1);
    }

    public SimpleDividerItemDecoration(Resources resources, int gridColumns) {
        this(resources, gridColumns, R.drawable.library_line_divider);

    }

    public SimpleDividerItemDecoration(Resources resources, int gridColumns, int drawable) {
        mDivider = resources.getDrawable(drawable);
        cols = gridColumns;
    }

    public SimpleDividerItemDecoration(Resources resources, int gridColumns, int drawable, int startIndex) {
        mDivider = resources.getDrawable(drawable);
        cols = gridColumns;
        this.startIndex = startIndex;
    }

    public void setStartIndex(int index) {
        this.startIndex = index;
    }

    public void onDrawOver(Canvas c, RecyclerView parent, RecyclerView.State state) {
        int left = parent.getPaddingLeft();
        int right = parent.getWidth() - parent.getPaddingRight();

        int childCount = parent.getChildCount();
        for (int i = startIndex; i < childCount; i++) {
            View child = parent.getChildAt(i);

            RecyclerView.LayoutParams params = (RecyclerView.LayoutParams) child.getLayoutParams();

            int top = child.getBottom() + params.bottomMargin;
            int bottom = top + mDivider.getIntrinsicHeight();

            if (i % cols == 0) {
                mDivider.setBounds(left, top, right, bottom);
                mDivider.draw(c);
            }

            if (cols != 0) {
                int width = (i % cols) * child.getWidth();
                mDivider.setBounds((width - mDivider.getIntrinsicHeight()), 0, width, i * child.getHeight());
                mDivider.draw(c);
            }
        }
    }
}