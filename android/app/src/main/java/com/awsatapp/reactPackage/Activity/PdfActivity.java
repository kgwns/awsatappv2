/*
 * Copyright (c)
 * Copyright (C) 2017. Codeline Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Malek Hijazi<malek.hijazii@gmail.com>, 2017
 *
 */

package com.awsatapp.reactPackage.Activity;

import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;


import androidx.appcompat.widget.Toolbar;

import com.awsatapp.R;
import com.awsatapp.reactPackage.utils.FontUtils;
import com.awsatapp.reactPackage.utils.Utils;
import com.awsatapp.reactPackage.view.PDFPagerAdapter;
import com.awsatapp.reactPackage.view.PDFViewPager;

import java.io.File;

/**
 * PDF viewer activity that takes in a file path and displays pdf
 * User {@link #newInstance(Context, String, String)} to call activity
 */
public class PdfActivity extends CoreActivity {

    private static final String EXTRA_PATH = "extra_path";
    private static final String EXTRA_TITLE = "extra_title";

    private String mPath;
    private String mTitle;

    private PDFViewPager mPdfViewPager;
    private ImageView backIcon;
    private LinearLayout backContainer;
    private TextView title;

    public static Intent newInstance(Context context, String pathToFile, String title) {
        Intent intent = new Intent(context, PdfActivity.class);
        intent.putExtra(EXTRA_PATH, pathToFile);
        intent.putExtra(EXTRA_TITLE, title);
        return intent;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pdf);
        mPath = getIntent().getStringExtra(EXTRA_PATH);
        mTitle = getIntent().getStringExtra(EXTRA_TITLE);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        backIcon = toolbar.findViewById(R.id.backIcon);
        backContainer = toolbar.findViewById(R.id.backIconContainer);
        title = toolbar.findViewById(R.id.toolbar_title);
        //toolbar.setBackgroundColor(getResources().getColor(R.color.toolbar));
        //toolbar.setTitleTextColor(getResources().getColor(R.color.toolbar_title));
        toolbar.setElevation(0);
        //setTitle(toolbar, mTitle);
        title.setText(mTitle);
        FontUtils.setBold(title.getContext(),title);
        backContainer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
        LinearLayout layout = (LinearLayout) findViewById(R.id.main);
        boolean isLollipopOrHigher = Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP;

        if (isLollipopOrHigher) {
            mPdfViewPager = new PDFViewPager(mContext, mPath);
            layout.addView(mPdfViewPager);
            mPdfViewPager.setRotationY(180);
        } else {
            try {
                launchOpenPDFIntent(mPath);
            } catch (ActivityNotFoundException e) {
                e.printStackTrace();
                Utils.showAlertDialog(this, "", getString(R.string.no_pdf_viewer));
            }
        }

    }

    private void launchOpenPDFIntent(String destinationPath) {
        File file = new File(destinationPath);
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(Uri.fromFile(file), "application/pdf");
        intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
        startActivity(intent);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (mPdfViewPager != null) {
            ((PDFPagerAdapter) mPdfViewPager.getAdapter()).close();
        }
    }
}
