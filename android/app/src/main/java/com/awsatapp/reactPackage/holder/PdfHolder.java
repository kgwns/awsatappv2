package com.awsatapp.reactPackage.holder;

import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.awsatapp.R;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.listener.ItemProgressListener;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.manager.DataManager;
import com.awsatapp.reactPackage.listener.ItemClickListener;
import com.awsatapp.reactPackage.model.Pdf;
import com.awsatapp.reactPackage.utils.FontUtils;
import com.awsatapp.reactPackage.utils.Utils;
import com.liulishuo.filedownloader.model.FileDownloadStatus;


import java.io.File;
import java.util.Locale;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 5/16/17.
 */

public class PdfHolder extends CoreHolder<Pdf> {
    private TextView mTitle;
    private TextView mDate;
    private Button mDownlaodBtn;

    public PdfHolder(View itemView, ItemClickListener listener, ItemProgressListener itemProgressListener) {
        super(itemView, listener,null,itemProgressListener);
        mTitle = (TextView) itemView.findViewById(R.id.title);
        mDate = (TextView) itemView.findViewById(R.id.date);
        mDownlaodBtn = (Button) itemView.findViewById(R.id.download_btn);

        if (DataManager.getInstance(mTitle.getContext()).isArabic()) {
            FontUtils.setBold(mTitle.getContext(), mDate, mTitle, mDownlaodBtn);
        }

    }

    @Override
    public void bindData(Pdf data,int position,ItemProgressListener itemProgressListener) {
        mTitle.setText(mTitle.getContext().getString(R.string.issue_number) + " " + data.getIssueNumber());
        mDownlaodBtn.setOnClickListener(this);
        String lang = CoreCacheManager.getInstance(mDate.getContext()).get(Constant.CACHE_LANGUAGE,"ar");
        mDate.setText(Utils.getFullDateFromTimestamp(new Locale(lang), data.getCreated()));
//        if (data.getmDownloadTask() != null) {
//            data.setStatus(1);
//
//            //mDownlaodBtn.setText(mTitle.getContext().getString(R.string.downloading));
//        } else if (fileExist(data.getIssueNumber() + ".pdf")) {
//            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.read));
//            data.setStatus(2);
//        } else if (data.getStatus() == 0) {
//            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.download));
//        }
        if (fileExist(data.getIssueNumber() + ".pdf")) {
            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.read));
            data.setStatus(2);
        } else if (data.getStatus() == 1) {
            if(data.getmDownloadTask().getStatus() == FileDownloadStatus.pending){
                mDownlaodBtn.setText(mContext.getString(R.string.downloading));
            }else if(data.getmDownloadTask().getStatus() == FileDownloadStatus.started ){
                mDownlaodBtn.setText(mContext.getString(R.string.downloading));
            } else if(data.getmDownloadTask().getStatus() == FileDownloadStatus.progress){
                long soFarBytes = data.getmDownloadTask().getLargeFileSoFarBytes();
                long totalBytes = data.getmDownloadTask().getLargeFileTotalBytes();
                mDownlaodBtn.setText(soFarBytes / 1000000 + "mb /" + totalBytes / 1000000 + "mb");
                itemProgressListener.onProgress(itemView,position,soFarBytes / 1000000 + "mb /" + totalBytes / 1000000 + "mb");
            }else{
                mDownlaodBtn.setText(mContext.getString(R.string.downloading));
            }
            // mDownlaodBtn.setText(mTitle.getContext().getString(R.string.downloading));
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
