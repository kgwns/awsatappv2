package com.awsatapp.reactPackage.Activity;

import android.content.Context;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.drawable.Drawable;
import android.os.Bundle;

import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.awsatapp.MainApplication;
import com.awsatapp.R;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.MyContextWrapper;
import com.awsatapp.reactPackage.listener.ItemClickListener;
import com.awsatapp.reactPackage.listener.ItemProgressListener;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.CoreListAdapter;
import com.awsatapp.reactPackage.PdfAdapter;
import com.awsatapp.reactPackage.manager.CoreNetworkManager;
import com.awsatapp.reactPackage.manager.FileDownloadSerialQueue;
import com.awsatapp.reactPackage.manager.NetworkManager;
import com.awsatapp.reactPackage.model.Pdf;
import com.awsatapp.reactPackage.model.PdfWrapper;
import com.awsatapp.reactPackage.utils.FontUtils;
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
import java.util.Objects;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 5/16/17.
 */

public class PdfArchiveActivity extends CoreListActivity<Pdf> {
    private boolean isGrid = true;
    private ArrayList<Pdf> mPdfs = new ArrayList<>();
    private ImageView backIcon;
    private LinearLayout backContainer;
    private TextView title;
    private PdfAdapter pdfAdapter;
    private FileDownloadSerialQueue pdfDownloadService;
    @Override
    public int getContentView() {
        return R.layout.activity_pdf_archive;
    }

    public static boolean isTablet(Context context) {
        Configuration config = context.getResources().getConfiguration();
        int screenSize = config.screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK;
        return screenSize >= Configuration.SCREENLAYOUT_SIZE_LARGE;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if(isTablet(mContext)) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
        }
        pdfDownloadService =  ((MainApplication) getApplication()).getPDFDownloadService();
        Toolbar toolbar = (Toolbar) findViewById(R.id.tb);
        title = toolbar.findViewById(R.id.toolbar_title);
        backIcon = tb.findViewById(R.id.backIcon);
        backContainer = tb.findViewById(R.id.backIconContainer);
        backContainer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
        toolbar.setElevation(0);
        FontUtils.setBold(title.getContext(),title);
        setOptionsMenu(R.menu.pdf_archive);

        getPdfArchive();
    }

    boolean checkIfTaskInQueue(Pdf data){
        boolean doesTaskExist = false;
        if(pdfDownloadService!=null && pdfDownloadService.getTask()!=null){
            if(pdfDownloadService.getTask().getUrl().equals(data.getUrl())){
                doesTaskExist = true;
            }
        }
        return doesTaskExist;
    }

    @Override
    protected void onResume() {

        super.onResume();
    }

    @Override
    public CoreListAdapter<Pdf> initAdapter() {

        pdfAdapter =  new PdfAdapter(mContext, rvList, mPdfs, new ItemClickListener() {
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
                                pdfDownloadService.removeCurrentTask();
                            }

                        } else if (pdf.getStatus() == 2) {
                            final String path = mContext.getFilesDir().getPath() + "/" + pdf.getIssueNumber() + ".pdf";

                            String lang = CoreCacheManager.getInstance(mContext).get(Constant.CACHE_LANGUAGE, "ar");
                            String timeStamp = !String.valueOf(mPdfs.get(integer).getCreated()).isEmpty() ? Utils.getFullDateFromTimestamp(new Locale(lang), mPdfs.get(integer).getCreated()) : "";
                            String edition = getString(R.string.edition);
                            String issueNumber = !String.valueOf(mPdfs.get(integer).getIssueNumber()).isEmpty() ? mPdfs.get(integer).getIssueNumber() : "";
                            String title = "";
                            if (!timeStamp.isEmpty()) {
                                if (!issueNumber.isEmpty()) {
                                    title = timeStamp + " " + edition + " " + issueNumber;
                                } else {
                                    title = timeStamp + " " + edition;
                                }
                            } else {
                                if (!issueNumber.isEmpty()) {
                                    title = edition + " " + issueNumber;
                                } else {
                                    title = "";
                                }
                            }
                            startActivity(PdfActivity.newInstance(mContext, path, title));
                        }


                    }
                }
        });
        return pdfAdapter;
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
        }else{
            rvList.addItemDecoration(new SimpleDividerItemDecoration(getResources()));
            return new LinearLayoutManager(mContext);
        }


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
                    if (fileExist(pdfs.get(0).getIssueNumber() + ".pdf")) {
                        pdfs.get(0).setStatus(2);
                    } else if(pdfDownloadService!=null && pdfDownloadService.checkIfTaskEnqueued(pdfs.get(0).getUrl())){
                        if(pdfDownloadService.getQueuedTask(pdfs.get(0).getUrl()).getUrl().equals(pdfs.get(0).getUrl())){
                            pdfs.get(0).setmDownloadTask(pdfDownloadService.getQueuedTask(pdfs.get(0).getUrl()));
                            pdfs.get(0).setStatus(1);
                        }
                    }else{
                        if(pdfDownloadService!=null && pdfDownloadService.checkIfTaskEnqueued(pdfs.get(0).getUrl())){
                            pdfs.get(0).setmDownloadTask(pdfDownloadService.getTask());
                            pdfs.get(0).setStatus(0);
                        }

                    }
                    getAdapter().updateItems(new ArrayList<>(pdfs.subList(0,14)));
                    mPdfs = (ArrayList<Pdf>) getAdapter().getItems();
                    rvList.setAdapter(initAdapter());
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

    }

    private void downloadPdf(final Button button, final Pdf pdf) {
        final String path = mContext.getFilesDir().getPath() + "/" + pdf.getIssueNumber() + ".pdf";
        if (fileExist(pdf.getIssueNumber() + ".pdf")) {
            //when file is already downloaded
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
                            //set text when downloading in progress
                            button.setText(soFarBytes / 1000000 + "mb /" + totalBytes / 1000000 + "mb");
                        }

                        @Override
                        protected void paused(BaseDownloadTask task, long soFarBytes, long totalBytes) {

                        }

                        @Override
                        protected void completed(BaseDownloadTask task) {
                            pdf.setStatus(2);
                            //when the dowload is completed
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
            pdfDownloadService.enqueue(downloadTask);
            //downloadTask.start();
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
    public void onProgress(View view, int position, String progress) {

    }

    @Override
    public boolean onMenuItemClick(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.mi_grid:
                item.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_list));
                if (!isGrid) {
                    item.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_list));
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

                    item.setIcon(ContextCompat.getDrawable(this, R.drawable.ic_view_grid));
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
            int nightModeFlags = mContext.getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
            Drawable upArrow =  ContextCompat.getDrawable(mContext, R.drawable.ic_back);
            Log.i("mode", String.valueOf(mContext.getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK));
            switch (nightModeFlags) {

                case Configuration.UI_MODE_NIGHT_YES:

                case Configuration.UI_MODE_NIGHT_UNDEFINED:
                    upArrow = ContextCompat.getDrawable(context, R.drawable.ic_back_white);
                    break;

                case Configuration.UI_MODE_NIGHT_NO:
                    upArrow = ContextCompat.getDrawable(context, R.drawable.ic_back);
                    break;
            }
//
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
