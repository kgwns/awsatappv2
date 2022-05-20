package com.awsatapp.reactPackage.Activity;

import android.content.Context;
import android.content.res.Configuration;
import android.graphics.PorterDuff;
import android.graphics.drawable.Drawable;
import android.os.Bundle;

import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.awsatapp.R;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.MyContextWrapper;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.CoreListAdapter;
import com.awsatapp.reactPackage.PdfAdapter;
import com.awsatapp.reactPackage.manager.CoreNetworkManager;
import com.awsatapp.reactPackage.manager.NetworkManager;
import com.awsatapp.reactPackage.model.Pdf;
import com.awsatapp.reactPackage.model.PdfWrapper;
import com.awsatapp.reactPackage.utils.SimpleDividerItemDecoration;
import com.awsatapp.reactPackage.utils.Utils;
import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadLargeFileListener;
import com.liulishuo.filedownloader.FileDownloader;

import org.json.JSONException;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Locale;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 5/16/17.
 */

public class PdfArchiveActivity extends CoreListActivity<Pdf> {
    private boolean isGrid = false;
    private ArrayList<Pdf> mPdfs = new ArrayList<>();

    @Override
    public int getContentView() {
        return R.layout.activity_pdf_archive;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setBackButtonEnabled();
        Toolbar toolbar = (Toolbar) findViewById(R.id.tb);
        toolbar.setBackgroundColor(getResources().getColor(R.color.toolbar));
        toolbar.setTitleTextColor(getResources().getColor(R.color.toolbar_title));
        setBackButtonEnabled(toolbar);
        toolbar.setElevation(0);
        setTitle(getString(R.string.pdf_archive_title));
        setOptionsMenu(R.menu.pdf_archive);
        rvList.addItemDecoration(new SimpleDividerItemDecoration(getResources()));
        getPdfArchive();
    }

    @Override
    public CoreListAdapter<Pdf> initAdapter() {
        return new PdfAdapter(mContext, rvList, mPdfs);
    }

    @Override
    public RecyclerView.LayoutManager initLayoutManager() {

        if (isGrid) {
            boolean tabletSize = getResources().getBoolean(R.bool.isTablet);
            if (tabletSize) {
                if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
                    return new GridLayoutManager(mContext, 4);
                } else {
                    return new GridLayoutManager(mContext, 5);
                }
            } else {
                return new GridLayoutManager(mContext, 2);
            }
        }
        return new LinearLayoutManager(mContext);
    }

    private void getPdfArchive() {
        NetworkManager networkManager = new NetworkManager(mContext);
        showLoader();
        try {
            networkManager.getPdfArchive(new CoreNetworkManager.Listener<PdfWrapper>() {
                @Override
                public void onSuccess(PdfWrapper response) {
                    ArrayList<Pdf> pdfs = new ArrayList<>(Arrays.asList(response.getData()));
                    Collections.reverse(pdfs);
                    getAdapter().updateItems(new ArrayList<>(pdfs.subList(0,14)));
                    mPdfs = (ArrayList<Pdf>) getAdapter().getItems();
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

    @Override
    public void onRefresh() {

    }

    @Override
    public void itemClicked(View view, int integer) {
        switch (view.getId()) {
            case R.id.download_btn:
                Button button = (Button) view;
                Pdf pdf = getAdapter().getItem(integer);
                if (pdf.getStatus() == 0) {
                    FileDownloader.setup(mContext);
                    downloadPdf(button, getAdapter().getItem(integer));
                    getAdapter().getItem(integer).setStatus(1);
                    button.setText(getString(R.string.downloading));
                } else if (pdf.getStatus() == 1) {
                    if (pdf.getmDownloadTask() != null) {
                        pdf.getmDownloadTask().pause();
                        pdf.setmDownloadTask(null);
                        pdf.setStatus(0);
                        button.setText(getString(R.string.download));
                    }
                } else if (pdf.getStatus() == 2) {
                    final String path = mContext.getFilesDir().getPath() + "/" + pdf.getIssueNumber() + ".pdf";
                    String lang = CoreCacheManager.getInstance(mContext).get(Constant.CACHE_LANGUAGE,"ar");
                    String title = Utils.getFullDateFromTimestamp(new Locale(lang), pdf.getCreated()) + " " + getString(R.string.issue_number);
                    startActivity(PdfActivity.newInstance(mContext, path, title));
                }
        }
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

    private boolean fileExist(String key) {
        File file = mContext.getFileStreamPath(key);
        Log.v("File", file.toString());
        return file.exists();
    }

    @Override
    public void onLoadMore() {

    }

    @Override
    public void onClick(View view) {

    }

    @Override
    public boolean onMenuItemClick(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.mi_grid:
                if (!isGrid) {
                    isGrid = true;
                    boolean tabletSize = getResources().getBoolean(R.bool.isTablet);
                    if (tabletSize) {
                        if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
                            rvList.setLayoutManager(new GridLayoutManager(mContext, 3));
                        } else {
                            rvList.setLayoutManager(new GridLayoutManager(mContext, 5));
                        }
                    } else {
                        rvList.setLayoutManager(new GridLayoutManager(mContext, 2));
                    }
                    rvList.setAdapter(initAdapter());

                } else {

                    isGrid = false;
                    rvList.setLayoutManager(new LinearLayoutManager(mContext));
                    rvList.setAdapter(initAdapter());
                }
                break;

        }
        return super.onMenuItemClick(item);
    }

    public void setBackButtonEnabled(Toolbar tb) {
        setBackButtonEnabled(tb, true);
    }

    public void setBackButtonEnabled(Toolbar tb, boolean blackColor) {
        if (tb != null) {
            Context context = MyContextWrapper.wrap(mContext, new Locale(CoreCacheManager.getInstance(mContext).get(Constant.CACHE_LANGUAGE, "ar")));
            Drawable upArrow = ContextCompat.getDrawable(context, R.drawable.ic_back);
//            if (blackColor) {
//                upArrow.setColorFilter(ContextCompat.getColor(context, android.R.color.black), PorterDuff.Mode.SRC_ATOP);
//            } else {
//                upArrow.setColorFilter(ContextCompat.getColor(context, android.R.color.white), PorterDuff.Mode.SRC_ATOP);
//            }
            tb.setNavigationIcon(upArrow);

            tb.setNavigationOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onBackPressed();
                }
            });
        }
    }
}
