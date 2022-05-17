package com.awsatapp.reactPackage.fragment;

import android.graphics.Matrix;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.annotation.Nullable;

import com.awsatapp.R;
import com.awsatapp.reactPackage.Activity.PdfActivity;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.manager.CoreNetworkManager;
import com.awsatapp.reactPackage.manager.DataManager;
import com.awsatapp.reactPackage.manager.NetworkManager;
import com.awsatapp.reactPackage.model.Pdf;
import com.awsatapp.reactPackage.model.PdfWrapper;
import com.awsatapp.reactPackage.utils.FontUtils;
import com.awsatapp.reactPackage.utils.Utils;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;
import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadLargeFileListener;
import com.liulishuo.filedownloader.FileDownloader;

import org.json.JSONException;

import java.io.File;
import java.util.Locale;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 6/15/17.
 */

public class DownloadNewsFragment extends CoreFragment implements View.OnClickListener {

    private TextView mTitle;
    private ImageView mImage;
    private TextView mDate;
    private Button mDownlaodBtn;
    private ProgressBar mLoader;
    private LinearLayout mContainer;
    private Pdf mPdf;

    public static DownloadNewsFragment newInstance() {
        return new DownloadNewsFragment();
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_daily_pdf, container, false);
    }

    @Override
    public void onViewCreated(final View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mTitle = (TextView) view.findViewById(R.id.title);
        mImage = (ImageView) view.findViewById(R.id.image);
        mDate = (TextView) view.findViewById(R.id.date);
        mDownlaodBtn = (Button) view.findViewById(R.id.download_btn);
        mLoader = (ProgressBar) view.findViewById(R.id.loader);
        mContainer = (LinearLayout) view.findViewById(R.id.pdf_container);

        if (DataManager.getInstance(mTitle.getContext()).isArabic()) {
            FontUtils.setBold(mTitle.getContext(), mDate, mTitle, mDownlaodBtn);
        }

        mDownlaodBtn.setOnClickListener(this);
        getPdfArchive();
    }

    private void getPdfArchive() {
        NetworkManager networkManager = new NetworkManager(mContext);
        showLoader();
        try {
            networkManager.getPdfArchive(new CoreNetworkManager.Listener<PdfWrapper>() {
                @Override
                public void onSuccess(PdfWrapper response) {
                    if (response != null) {
                        mPdf = response.getData()[response.getData().length -1];
                        mTitle.setText(mTitle.getContext().getString(R.string.issue_number) + " " + mPdf.getIssueNumber());

                        String lang = CoreCacheManager.getInstance(mDate.getContext()).get(Constant.CACHE_LANGUAGE);
                        mDate.setText(Utils.getFullDateFromTimestamp(new Locale(lang), mPdf.getCreated()));

                        Glide.with(requireContext()).load(mPdf.getThumb()).listener(new RequestListener<Drawable>() {
                            @Override
                            public boolean onLoadFailed(@Nullable GlideException e, Object model, Target<Drawable> target, boolean isFirstResource) {
                                return false;
                            }

                            @Override
                            public boolean onResourceReady(Drawable resource, Object model, Target<Drawable> target, DataSource dataSource, boolean isFirstResource) {
                                final Matrix matrix = mImage.getImageMatrix();
                                float scale;
                                final int viewWidth = mImage.getWidth() - mImage.getPaddingLeft() - mImage.getPaddingRight();
                                final int viewHeight = mImage.getHeight() - mImage.getPaddingTop() - mImage.getPaddingBottom();
                                final int drawableWidth = resource.getIntrinsicWidth();
                                final int drawableHeight = resource.getIntrinsicHeight();

                                if (drawableWidth * viewHeight > drawableHeight * viewWidth) {
                                    scale = (float) viewHeight / (float) drawableHeight;
                                } else {
                                    scale = (float) viewWidth / (float) drawableWidth;
                                }

                                matrix.setScale(scale, scale);
                                mImage.setImageMatrix(matrix);
                                return false;
                            }
                        }).into(mImage);


                        if (fileExist(mPdf.getIssueNumber() + ".pdf")) {
                            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.read));
                            mPdf.setStatus(2);
                        } else if (mPdf.getStatus() == 1) {
                            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.downloading));
                        } else if (mPdf.getStatus() == 0) {
                            mDownlaodBtn.setText(mTitle.getContext().getString(R.string.download));
                        }
                    } else {
                        //todo show empty view
                    }
                    hideLoader();
                }

                @Override
                public void onError(Exception e) {
                    hideLoader();
                    //todo
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    private Boolean fileExist(String key) {
        File file = mContext.getFileStreamPath(key);
        Log.v("File", file.toString());
        return file.exists();
    }

    private void hideLoader() {
        vm.hideAndShow(mLoader, mContainer);
    }

    private void showLoader() {
        vm.showAndHide(mLoader, mContainer);
    }

    private void downloadPdf(final Button button, final Pdf pdf) {
        final String path = mContext.getFilesDir().getPath() + "/" + pdf.getIssueNumber() + ".pdf";
        if (fileExist(pdf.getIssueNumber() + ".pdf")) {
            button.setText(getString(R.string.read));
        } else {
            BaseDownloadTask downloadTask = FileDownloader.getImpl().create(pdf.getUrl())
                    .setPath(path, false)
                    .setListener(new FileDownloadLargeFileListener() {
                        @Override
                        protected void pending(BaseDownloadTask task, long soFarBytes, long totalBytes) {

                        }

                        @Override
                        protected void progress(BaseDownloadTask task, long soFarBytes, long totalBytes) {
                            button.setText(soFarBytes / 1000000 + "mb /" + totalBytes / 1000000 + "mb");
                            Log.v("Progress", "" + soFarBytes);
                        }

                        @Override
                        protected void paused(BaseDownloadTask task, long soFarBytes, long totalBytes) {

                        }

                        @Override
                        protected void completed(BaseDownloadTask task) {
                            Log.v("Progress", "completed " + task.getPath());
                            pdf.setStatus(2);
                            button.setText(getString(R.string.read));
                        }

                        @Override
                        protected void error(BaseDownloadTask task, Throwable e) {
                            Log.v("Progress", "error " + e.getMessage());
                            e.printStackTrace();
                        }

                        @Override
                        protected void warn(BaseDownloadTask task) {

                        }
                    });
            pdf.setmDownloadTask(downloadTask);
            downloadTask.start();

        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.download_btn:
                Button button = (Button) v;
                if (mPdf.getStatus() == 0) {
                    FileDownloader.setup(mContext);
                    downloadPdf(button, mPdf);
                    mPdf.setStatus(1);
                    button.setText(getString(R.string.downloading));
                } else if (mPdf.getStatus() == 1) {
                    if (mPdf.getmDownloadTask() != null) {
                        mPdf.getmDownloadTask().pause();
                        mPdf.setmDownloadTask(null);
                        mPdf.setStatus(0);
                        button.setText(getString(R.string.download));
                    }
                } else if (mPdf.getStatus() == 2) {
                    final String path = mContext.getFilesDir().getPath() + "/" + mPdf.getIssueNumber() + ".pdf";
                    String lang = CoreCacheManager.getInstance(mContext).get(Constant.CACHE_LANGUAGE);
                    String title = Utils.getFullDateFromTimestamp(new Locale(lang), mPdf.getCreated()) + " " + getString(R.string.issue_number) + " " + mPdf.getIssueNumber();
                    startActivity(PdfActivity.newInstance(mContext, path, title));
                }
        }
    }
}
