package com.awsatapp.reactPackage.fragment;

import static android.graphics.Color.rgb;
import static androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_NO;
import static androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_YES;

import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
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
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;
import androidx.swiperefreshlayout.widget.CircularProgressDrawable;

import com.awsatapp.MainApplication;
import com.awsatapp.R;
import com.awsatapp.reactPackage.Activity.PdfActivity;
import com.awsatapp.reactPackage.Activity.PdfArchiveActivity;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.PDFViewListener;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.manager.CoreNetworkManager;
import com.awsatapp.reactPackage.manager.FileDownloadSerialQueue;
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
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.admanager.AdManagerAdRequest;
import com.google.android.gms.ads.admanager.AdManagerAdView;
import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadLargeFileListener;
import com.liulishuo.filedownloader.FileDownloadListener;
import com.liulishuo.filedownloader.FileDownloader;
import com.liulishuo.filedownloader.model.FileDownloadStatus;

import org.json.JSONException;

import java.io.File;
import java.util.Locale;
import java.util.Objects;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 6/15/17.
 */

public class DownloadNewsFragment extends CoreFragment implements View.OnClickListener {
    private ConstraintLayout constraintLayout;
    private View rootView;
    private TextView mTitle;
    private ImageView mImage;
    private TextView mDate;
    private LinearLayout mDownlaodBtnContainer;
    private Button mDownlaodBtn;
    private TextView archiveBtn;

    private RelativeLayout adBannerTop;
    private RelativeLayout adBannerBottom;
    private ProgressBar mLoader;
    private LinearLayout mContainer;
    private PendingIntent pi;
    private Pdf mPdf;
    private FileDownloadSerialQueue pdfDownloadService = null;
    private int screenWidth;

    public static DownloadNewsFragment newInstance() {
        return new DownloadNewsFragment();
    }

    private final BroadcastReceiver fragmentBroadcast = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String themeData = intent.getStringExtra("theme");
            if(Objects.equals(themeData, "light")){
                AppCompatDelegate.setDefaultNightMode( MODE_NIGHT_NO);
                constraintLayout.setBackgroundColor(getResources().getColor(R.color.background_color));
                mDownlaodBtn.setBackground(ContextCompat.getDrawable(context,R.drawable.download_btn_black));
                mDownlaodBtn.setTextColor(Color.parseColor("#FFFFFF"));
            }else {
                constraintLayout.setBackgroundColor(Color.parseColor("#070606"));
                mDownlaodBtn.setBackground(ContextCompat.getDrawable(context,R.drawable.download_btn_white));
                mDownlaodBtn.setTextColor(Color.parseColor("#070606"));
                AppCompatDelegate.setDefaultNightMode( MODE_NIGHT_YES);
            }


        }
    };

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        String theme = getArguments().getString("theme");
        pdfDownloadService =  ((MainApplication) requireActivity().getApplication()).getPDFDownloadService();
        rootView = inflater.inflate(R.layout.fragment_download_news, container, false);
        return rootView;
    }

    @Override
    public void onViewCreated(final View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        constraintLayout = (ConstraintLayout)  view.findViewById(R.id.container);
        mTitle = (TextView) view.findViewById(R.id.title);
        mImage = (ImageView) view.findViewById(R.id.image);
        mDate = (TextView) view.findViewById(R.id.date);
        mDownlaodBtn = (Button) view.findViewById(R.id.download_btn);
        archiveBtn = (TextView) view.findViewById(R.id.newsArchive);
        mDownlaodBtnContainer = (LinearLayout) view.findViewById(R.id.newsArchiveBtn);
        mLoader = (ProgressBar) view.findViewById(R.id.loader);
        mContainer = (LinearLayout) view.findViewById(R.id.pdf_container);
        adBannerTop = (RelativeLayout) view.findViewById(R.id.adBannerTop);
        adBannerBottom = (RelativeLayout) view.findViewById(R.id.adBannerBottom);

        //FontUtils.setBold(archiveBtn.getContext(),archiveBtn);
        FontUtils.setLight(mTitle.getContext(), mTitle);
        FontUtils.setEffraRegular(mDate.getContext(),mDate);

        mDownlaodBtn.setOnClickListener(this);
        mDownlaodBtnContainer.setOnClickListener(this);
        getPdfArchive();
        loadBannerTop();
        loadBannerBottom();
    }

    public void setScreenWidth(int screenWidth) {
        this.screenWidth = screenWidth;
    }

    private void loadBannerTop() {
        // Create a new ad view.
        AdManagerAdView adBanner = new AdManagerAdView(getContext());
        adBanner.setAdSizes(new AdSize(screenWidth, 50));
        adBanner.setAdUnitId("/5910/AsharqAlawsat_APP/ADR/Newspaper");

        // Replace ad container with new ad view.
        adBannerTop.removeAllViews();
        adBannerTop.addView(adBanner);

        // Start loading the ad in the background.
        AdManagerAdRequest adRequest = new AdManagerAdRequest.Builder().build();
        adBanner.loadAd(adRequest);
    }

    private void loadBannerBottom() {
        // Create a new ad view.
        AdManagerAdView adBanner = new AdManagerAdView(getContext());
        adBanner.setAdSizes(new AdSize(screenWidth, 50));
        adBanner.setAdUnitId("/5910/AsharqAlawsat_APP/ADR/Newspaper");

        // Replace ad container with new ad view.
        adBannerBottom.removeAllViews();
        adBannerBottom.addView(adBanner);

        // Start loading the ad in the background.
        AdManagerAdRequest adRequest = new AdManagerAdRequest.Builder().build();
        adBanner.loadAd(adRequest);
    }

    @Override
    public void onResume() {
        IntentFilter filter = new IntentFilter("custom-action-local-broadcast");
        requireActivity().registerReceiver(fragmentBroadcast,filter);
        if(mPdf!=null){
            if (fileExist(mPdf.getIssueNumber() + ".pdf")) {
                mDownlaodBtn.setText(mContext.getString(R.string.read));
                mPdf.setStatus(2);
            }else if(null != pdfDownloadService.getTask() &&
                    Objects.equals(pdfDownloadService.getTask().getUrl(), mPdf.getUrl()) &&
                    pdfDownloadService.getTask().getStatus() == FileDownloadStatus.paused){
                mPdf.setStatus(0);
                mPdf.setmDownloadTask(pdfDownloadService.getTask());
                mDownlaodBtn.setText(mContext.getString(R.string.download));
            }else if(null != pdfDownloadService.getTask() &&
                    Objects.equals(pdfDownloadService.getTask().getUrl(), mPdf.getUrl())){
                mPdf.setStatus(1);
                mPdf.setmDownloadTask(pdfDownloadService.getTask());
                mDownlaodBtn.setText(mContext.getString(R.string.downloading));
            }
        }
        updateDownloadProgress();
        super.onResume();
    }

    @Override
    public void onPause() {
        requireActivity().unregisterReceiver(fragmentBroadcast);
        super.onPause();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
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
                        //mTitle.setText(mTitle.getContext().getString(R.string.issue_number));

                        String lang = CoreCacheManager.getInstance(mDate.getContext()).get(Constant.CACHE_LANGUAGE,"ar");
                        mDate.setText(Utils.getFullDateFromTimestamp(new Locale(lang), mPdf.getCreated()));

                        CircularProgressDrawable circularProgressDrawable = new CircularProgressDrawable(mContext);
                        circularProgressDrawable.setColorSchemeColors(rgb(165,192,167));
                        circularProgressDrawable.setCenterRadius(30f);
                        circularProgressDrawable.setStrokeWidth(5f);
                        circularProgressDrawable.start();

                        Glide.with(requireContext())
                                .load(mPdf.getThumb())
                                .placeholder(circularProgressDrawable)
                                .listener(new RequestListener<Drawable>() {
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
                    .setForceReDownload(true)
                    .setListener(new FileDownloadLargeFileListener() {
                        @Override
                        protected void pending(BaseDownloadTask task, long soFarBytes, long totalBytes) {

                        }

                        @Override
                        protected void progress(BaseDownloadTask task, long soFarBytes, long totalBytes) {
                            button.setText(soFarBytes / 1000000 + "mb / " + totalBytes / 1000000 + "mb");
                            Log.v("Progress", "" + soFarBytes);
                        }

                        @Override
                        protected void paused(BaseDownloadTask task, long soFarBytes, long totalBytes) {

                        }

                        @Override
                        protected void completed(BaseDownloadTask task) {
                            Log.v("Progress", "completed " + task.getPath());
                            pdf.setStatus(2);
                            PDFViewListener.sendPdfInfo(mPdf);
                            button.setText(getString(R.string.read));
                            final String path = mContext.getFilesDir().getPath() + "/" + mPdf.getIssueNumber() + ".pdf";
                            String lang = CoreCacheManager.getInstance(mContext).get(Constant.CACHE_LANGUAGE,"ar");
                            String timeStamp = !String.valueOf(mPdf.getCreated()).isEmpty() ? Utils.getFullDateFromTimestamp(new Locale(lang), mPdf.getCreated()):"";
                            String edition = getString(R.string.edition);
                            String issueNumber = !String.valueOf(mPdf.getIssueNumber()).isEmpty()?mPdf.getIssueNumber():"";
                            String title = "";
                            if(!timeStamp.isEmpty()){
                                if(!issueNumber.isEmpty()){
                                    title = timeStamp + " " + edition +" "+ issueNumber;
                                }else{
                                    title = timeStamp + " " + edition;
                                }
                            }else{
                                if(!issueNumber.isEmpty()){
                                    title = edition + " " + issueNumber;
                                }else {
                                    title = "";
                                }
                            }
                            if (isVisible()) {
                                startActivity(PdfActivity.newInstance(mContext, path, title));
                            }
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
            pdfDownloadService.enqueue(downloadTask);
            //downloadTask.start();

        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.download_btn:
                Button button = (Button) v;
                if( null != mPdf) {
                    PDFViewListener.sendPdfInfo(mPdf);
                    if (mPdf.getStatus() == 0 ) {
                        FileDownloader.setup(mContext);
                        downloadPdf(button, mPdf);
                        mPdf.setStatus(1);
                        button.setText(getString(R.string.downloading));
                    } else if (mPdf.getStatus() == 1 ) {
                        if (mPdf.getmDownloadTask() != null) {
                            mPdf.getmDownloadTask().pause();
                            mPdf.setmDownloadTask(null);
                            mPdf.setStatus(0);
                            button.setText(getString(R.string.download));
                            pdfDownloadService.removeCurrentTask();
                        }

                    } else if (mPdf.getStatus() == 2) {
                        final String path = mContext.getFilesDir().getPath() + "/" + mPdf.getIssueNumber() + ".pdf";
                        String lang = CoreCacheManager.getInstance(mContext).get(Constant.CACHE_LANGUAGE,"ar");
                        String timeStamp = !String.valueOf(mPdf.getCreated()).isEmpty() ? Utils.getFullDateFromTimestamp(new Locale(lang), mPdf.getCreated()):"";
                        String edition = getString(R.string.edition);
                        String issueNumber = !String.valueOf(mPdf.getIssueNumber()).isEmpty()?mPdf.getIssueNumber():"";
                        String title = "";
                        if(!timeStamp.isEmpty()){
                            if(!issueNumber.isEmpty()){
                                title = timeStamp + " " + edition +" "+ issueNumber;
                            }else{
                                title = timeStamp + " " + edition;
                            }
                        }else{
                            if(!issueNumber.isEmpty()){
                                title = edition + " " + issueNumber;
                            }else {
                                title = "";
                            }
                        }

                        startActivity(PdfActivity.newInstance(mContext, path, title));
                    }
                } else {
                    CharSequence text = "يرجى الانتظار حتى يتم تحميل المحتوى";
                    int duration = Toast.LENGTH_SHORT;

                    Toast toast = Toast.makeText(mContext, text, duration);
                    toast.show();
                }

            break;
            case R.id.newsArchiveBtn:
                startActivity(PdfArchiveActivity.class);
                break;
        }
    }

    boolean checkIfTaskInQueue(){
        boolean doesTaskExist = false;
        if(pdfDownloadService!=null && pdfDownloadService.getTask()!=null){
            if(pdfDownloadService.getTask().getUrl().equals(mPdf.getUrl())){
                mPdf.setStatus(1);
                mDownlaodBtn.setText(getString(R.string.downloading));
                doesTaskExist = true;
            }
        }
        return doesTaskExist;
    }

    void updateDownloadProgress(){
        if(pdfDownloadService!=null && pdfDownloadService.getTask()!=null){
            if(pdfDownloadService.getTask().getUrl().equals(mPdf.getUrl())){
                int status = pdfDownloadService.getTask().getStatus();
                switch (status){
                    case FileDownloadStatus.paused:
                        mPdf.setStatus(0);
                        mDownlaodBtn.setText(getString(R.string.download));
                        break;
                    case FileDownloadStatus.completed:
                        mPdf.setStatus(2);
                        mDownlaodBtn.setText(getString(R.string.read));
                        break;

                    default:
                        break;
                }
                pdfDownloadService.getTask().setListener(new FileDownloadListener() {
                    @Override
                    protected void pending(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                    }

                    @Override
                    protected void progress(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                        mDownlaodBtn.setText(soFarBytes / 1000000 + "mb /" + totalBytes / 1000000 + "mb");
                    }

                    @Override
                    protected void completed(BaseDownloadTask task) {
                        mPdf.setStatus(2);
                        mDownlaodBtn.setText(getString(R.string.read));
                        final String path = mContext.getFilesDir().getPath() + "/" + mPdf.getIssueNumber() + ".pdf";
                        String lang = CoreCacheManager.getInstance(mContext).get(Constant.CACHE_LANGUAGE,"ar");
                        String timeStamp = !String.valueOf(mPdf.getCreated()).isEmpty() ? Utils.getFullDateFromTimestamp(new Locale(lang), mPdf.getCreated()):"";
                        String edition = getString(R.string.edition);
                        String issueNumber = !String.valueOf(mPdf.getIssueNumber()).isEmpty()?mPdf.getIssueNumber():"";
                        String title = "";
                        if(!timeStamp.isEmpty()){
                            if(!issueNumber.isEmpty()){
                                title = timeStamp + " " + edition +" "+ issueNumber;
                            }else{
                                title = timeStamp + " " + edition;
                            }
                        }else{
                            if(!issueNumber.isEmpty()){
                                title = edition + " " + issueNumber;
                            }else {
                                title = "";
                            }
                        }

                        startActivity(PdfActivity.newInstance(mContext, path, title));
                    }

                    @Override
                    protected void paused(BaseDownloadTask task, int soFarBytes, int totalBytes) {
                        task.pause();
                        pdfDownloadService.getTask().pause();
                    }

                    @Override
                    protected void error(BaseDownloadTask task, Throwable e) {
                        task.pause();
                        pdfDownloadService.getTask().pause();

                    }

                    @Override
                    protected void warn(BaseDownloadTask task) {

                    }
                });
            }
        }
    }
}
