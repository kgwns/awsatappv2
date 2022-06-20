package com.awsatapp.reactPackage.manager;
import com.awsatapp.reactPackage.listener.OnPdfDownloadStart;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 19/06/22
 */
public class PdfDownloadManager {
    OnPdfDownloadStart onPdfDownloadStart;
    private static PdfDownloadManager mInstance;
    FileDownloadSerialQueue fileDownloadSerialQueue;
    public static PdfDownloadManager getInstance() {
        if(mInstance == null) {
            mInstance = new PdfDownloadManager();
        }
        return mInstance;
    }

    public void setListener(OnPdfDownloadStart listener) {
        onPdfDownloadStart = listener;
    }

    public void setOnPdfDownloadStart(FileDownloadSerialQueue fileDownloadSerialQueue) {
        if(onPdfDownloadStart != null) {
            this.fileDownloadSerialQueue = fileDownloadSerialQueue;
            notifyStateChange(fileDownloadSerialQueue);
        }
    }

    public FileDownloadSerialQueue getFileDownloadSerialQueue() {
        return fileDownloadSerialQueue;
    }

    private void notifyStateChange(FileDownloadSerialQueue fileDownloadSerialQueue) {
        onPdfDownloadStart.onDownloadProgress(fileDownloadSerialQueue);
    }
}
