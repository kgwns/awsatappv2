package com.awsatapp.reactPackage.manager;

import com.awsatapp.reactPackage.listener.OnDownloadStart;
import com.awsatapp.reactPackage.model.Pdf;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 17/06/22
 */
public class DownloadStartManager {
    OnDownloadStart onDownloadStart;
    private static DownloadStartManager mInstance;
    Pdf mPdf;
    public static DownloadStartManager getInstance() {
        if(mInstance == null) {
            mInstance = new DownloadStartManager();
        }
        return mInstance;
    }

    public void setListener(OnDownloadStart listener) {
        onDownloadStart = listener;
    }

    public void onDownload(Pdf pdf) {
        if(onDownloadStart != null) {
            mPdf = pdf;
            notifyStateChange(pdf);
        }
    }

    public Pdf getPdf() {
        return mPdf;
    }

    private void notifyStateChange(Pdf pdf) {
        onDownloadStart.onDownloadProgress(pdf);
    }
}
