package com.awsatapp.reactPackage.holder;

import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.awsatapp.R;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.manager.DataManager;
import com.awsatapp.reactPackage.listener.ItemClickListener;
import com.awsatapp.reactPackage.model.Pdf;
import com.awsatapp.reactPackage.utils.FontUtils;
import com.awsatapp.reactPackage.utils.Utils;
import com.bumptech.glide.Glide;

import java.io.File;
import java.util.Locale;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 5/16/17.
 */

public class PdfGridHolder extends CoreHolder<Pdf> {
    private TextView mTitle;
    private ImageView mImage;
    private TextView mDate;
    private Button mDownlaodBtn;

    public PdfGridHolder(View itemView, ItemClickListener listener) {
        super(itemView, listener);
        mTitle = (TextView) itemView.findViewById(R.id.title);
        mImage = (ImageView) itemView.findViewById(R.id.image);
        mDate = (TextView) itemView.findViewById(R.id.date);
        mDownlaodBtn = (Button) itemView.findViewById(R.id.download_btn);

        if (DataManager.getInstance(mTitle.getContext()).isArabic()) {
            FontUtils.setBold(mTitle.getContext(), mDate, mTitle, mDownlaodBtn);
        }

        mDownlaodBtn.setOnClickListener(this);

    }

    @Override
    public void bindData(Pdf data) {

        mTitle.setText(mTitle.getContext().getString(R.string.issue_number) + " " + data.getIssueNumber());

        String lang = CoreCacheManager.getInstance(mDate.getContext()).get(Constant.CACHE_LANGUAGE);
        mDate.setText(Utils.getFullDateFromTimestamp(new Locale(lang), data.getCreated()));

        Glide.with(mImage.getContext()).load(data.getThumb()).into(mImage);
        if (fileExist(data.getIssueNumber() + ".pdf")) {
            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.read));
            data.setStatus(2);
        } else if (data.getStatus() == 1) {
            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.downloading));
        } else if (data.getStatus() == 0) {
            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.download));
        }
    }

    private boolean fileExist(String key) {
        File file = mTitle.getContext().getFileStreamPath(key);
        Log.v("File", file.toString());
        return file.exists();
    }
}
