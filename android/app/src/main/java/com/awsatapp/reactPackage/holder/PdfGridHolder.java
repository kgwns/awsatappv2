package com.awsatapp.reactPackage.holder;

import static android.graphics.Color.rgb;

import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.swiperefreshlayout.widget.CircularProgressDrawable;

import com.awsatapp.MainApplication;
import com.awsatapp.R;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.listener.ItemClickListener;
import com.awsatapp.reactPackage.listener.ItemProgressListener;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.manager.DataManager;
import com.awsatapp.reactPackage.manager.FileDownloadSerialQueue;
import com.awsatapp.reactPackage.model.Pdf;
import com.awsatapp.reactPackage.utils.FontUtils;
import com.awsatapp.reactPackage.utils.Utils;
import com.bumptech.glide.Glide;
import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadListener;
import com.liulishuo.filedownloader.model.FileDownloadStatus;

import java.io.File;
import java.util.Locale;
import java.util.Objects;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 5/16/17.
 */

public class PdfGridHolder extends CoreHolder<Pdf> {
    private TextView mTitle;
    private ImageView mImage;
    private TextView mDate;
    private Button mDownlaodBtn;
    private FileDownloadSerialQueue fileDownloadSerialQueue;
    public PdfGridHolder(View itemView, ItemClickListener listener) {
        super(itemView, listener,null);
        mTitle = (TextView) itemView.findViewById(R.id.title);
        mImage = (ImageView) itemView.findViewById(R.id.image);
        mDate = (TextView) itemView.findViewById(R.id.date);
        mDownlaodBtn = (Button) itemView.findViewById(R.id.download_btn);
        if (DataManager.getInstance(mTitle.getContext()).isArabic()) {
            FontUtils.setBold(mTitle.getContext(), mDate, mTitle, mDownlaodBtn);
        }
        mDownlaodBtn.setOnClickListener(this);
        fileDownloadSerialQueue =  ((MainApplication) mContext.getApplicationContext()).getPDFDownloadService();
    }

    @Override
    public void bindData(Pdf data,int position,ItemProgressListener itemProgressListener) {

        mTitle.setText(mTitle.getContext().getString(R.string.issue_number) + " " + data.getIssueNumber());

        String lang = CoreCacheManager.getInstance(mDate.getContext()).get(Constant.CACHE_LANGUAGE,"ar");
        mDate.setText(Utils.getFullDateFromTimestamp(new Locale(lang), data.getCreated()));

        CircularProgressDrawable circularProgressDrawable = new CircularProgressDrawable(mContext);
        circularProgressDrawable.setColorSchemeColors(rgb(165,192,167));
        circularProgressDrawable.setCenterRadius(30f);
        circularProgressDrawable.setStrokeWidth(5f);
        circularProgressDrawable.start();

        Glide.with(mImage.getContext())
                .load(data.getThumb())
                .placeholder(circularProgressDrawable)
                .into(mImage);

        if (fileExist(data.getIssueNumber() + ".pdf")) {
            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.read));
            data.setStatus(2);
        }
//        else if(fileDownloadSerialQueue!=null && fileDownloadSerialQueue.checkIfTaskEnqueued(data.getUrl())){
//            if(fileDownloadSerialQueue.getQueuedTask(data.getUrl()).getUrl().equals(data.getUrl())){
//                data.setmDownloadTask(fileDownloadSerialQueue.getQueuedTask(data.getUrl()));
//                data.setStatus(1);
//            }
//        }else{
//            if(fileDownloadSerialQueue!=null && fileDownloadSerialQueue.checkIfTaskEnqueued(data.getUrl())){
//                data.setmDownloadTask(fileDownloadSerialQueue.getTask());
//                data.setStatus(0);
//            }
//
//        }

        else if (data.getStatus() == 1) {
            long soFarBytes = data.getmDownloadTask().getLargeFileSoFarBytes();
            long totalBytes = data.getmDownloadTask().getLargeFileTotalBytes();
            if(totalBytes>soFarBytes){
                mDownlaodBtn.setText(soFarBytes / 1000000 + "mb /" + totalBytes / 1000000 + "mb");
            }else{
                mDownlaodBtn.setText(mContext.getString(R.string.downloading));
            }
        } else if (data.getStatus() == 0) {
            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.download));
        }

        try{
            if(fileDownloadSerialQueue.getTask()!=null) {
                if(null != fileDownloadSerialQueue && Objects.equals(fileDownloadSerialQueue.getTask().getUrl(), data.getUrl())){
                    fileDownloadSerialQueue.getTask().setListener(new FileDownloadListener() {
                        @Override
                        protected void pending(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                        }

                        @Override
                        protected void progress(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                            mDownlaodBtn.setText(soFarBytes / 1000000 + "mb /" + totalBytes / 1000000 + "mb");
                        }

                        @Override
                        protected void completed(BaseDownloadTask task) {
                            data.setStatus(2);
                            mDownlaodBtn.setText(mContext.getString(R.string.read));
                        }

                        @Override
                        protected void paused(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                            task.pause();
                            fileDownloadSerialQueue.getTask().pause();
                        }

                        @Override
                        protected void error(BaseDownloadTask task, Throwable e) {
                            task.pause();
                            fileDownloadSerialQueue.getTask().pause();
                        }

                        @Override
                        protected void warn(BaseDownloadTask task) {

                        }
                    });
                }
            }else{

            }
        }catch (Exception e){

        }


    }

    private boolean fileExist(String key) {
        File file = mTitle.getContext().getFileStreamPath(key);
        Log.v("File", file.toString());
        return file.exists();
    }


}
