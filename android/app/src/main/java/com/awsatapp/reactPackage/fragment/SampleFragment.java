package com.awsatapp.reactPackage.fragment;

import android.content.res.Configuration;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.awsatapp.R;
import com.awsatapp.reactPackage.Activity.PdfActivity;
import com.awsatapp.reactPackage.Constant;
import com.awsatapp.reactPackage.CoreListAdapter;
import com.awsatapp.reactPackage.PdfAdapter;
import com.awsatapp.reactPackage.listener.ItemClickListener;
import com.awsatapp.reactPackage.manager.CoreCacheManager;
import com.awsatapp.reactPackage.manager.CoreNetworkManager;
import com.awsatapp.reactPackage.manager.NetworkManager;
import com.awsatapp.reactPackage.model.Pdf;
import com.awsatapp.reactPackage.model.PdfWrapper;
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

public class SampleFragment extends Fragment implements ItemClickListener {

    public RecyclerView rvList;
    public PdfAdapter adapter;
    private ArrayList<Pdf> mPdfs = new ArrayList<>();
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_sample, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        getPdfArchive();
        rvList = (RecyclerView) view.findViewById(R.id.rv);


        rvList.setLayoutManager(initLayoutManager());
        adapter = new PdfAdapter(getContext(), rvList, mPdfs, new ItemClickListener() {
            @Override
            public void itemClicked(View view, int integer) {

            }
        });
        //adapter.setItemClickListener(this);
        //adapter.setOnLoadMoreListener(this);
        rvList.setAdapter(adapter);
    }

    private void getPdfArchive() {
        NetworkManager networkManager = new NetworkManager(getContext());
        //showLoader();
        try {
            networkManager.getPdfArchive(new CoreNetworkManager.Listener<PdfWrapper>() {
                @Override
                public void onSuccess(PdfWrapper response) {

                    ArrayList<Pdf> pdfs = new ArrayList<>(Arrays.asList(response.getData()));
                    Log.i("response:-", pdfs.toString());
                    Collections.reverse(pdfs);
                    //getAdapter().updateItems(pdfs);
                    mPdfs = (ArrayList<Pdf>) pdfs;
                    //hideLoader();
                }

                @Override
                public void onError(Exception e) {
                    //hideLoader();
                    //todo
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public RecyclerView.LayoutManager initLayoutManager() {

        if (false) {
            boolean tabletSize = getResources().getBoolean(R.bool.isTablet);
            if (tabletSize) {
                if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
                    return new GridLayoutManager(getContext(), 4);
                } else {
                    return new GridLayoutManager(getContext(), 5);
                }
            } else {
                return new GridLayoutManager(getContext(), 2);
            }
        }
        return new LinearLayoutManager(getContext());
    }

    @Override
    public void itemClicked(View view, int integer) {
        Log.i("itemClicked","itemClicked");
        switch (view.getId()) {
            case R.id.download_btn:
                Button button = (Button) view;
                Pdf pdf = mPdfs.get(integer);
                if (pdf.getStatus() == 0) {
                    FileDownloader.setup(getContext());
                    downloadPdf(button, mPdfs.get(integer));
                    mPdfs.get(integer).setStatus(1);
                    button.setText(getString(R.string.downloading));
                } else if (pdf.getStatus() == 1) {
                    if (pdf.getmDownloadTask() != null) {
                        pdf.getmDownloadTask().pause();
                        pdf.setmDownloadTask(null);
                        pdf.setStatus(0);
                        button.setText(getString(R.string.download));
                    }
                } else if (pdf.getStatus() == 2) {
                    final String path = getContext().getFilesDir().getPath() + "/" + pdf.getIssueNumber() + ".pdf";
                    String lang = CoreCacheManager.getInstance(getContext()).get(Constant.CACHE_LANGUAGE);
                    String title = Utils.getFullDateFromTimestamp(new Locale(lang), pdf.getCreated()) + " " + getString(R.string.issue_number) + " " + pdf.getIssueNumber();
                    startActivity(PdfActivity.newInstance(getContext(), path, title));
                }
        }
    }

    private void downloadPdf(final Button button, final Pdf pdf) {
        final String path = getContext().getFilesDir().getPath() + "/" + pdf.getIssueNumber() + ".pdf";
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
        File file = getContext().getFileStreamPath(key);
        Log.v("File", file.toString());
        return file.exists();
    }
}