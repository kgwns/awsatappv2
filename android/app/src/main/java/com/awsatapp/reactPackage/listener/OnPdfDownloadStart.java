package com.awsatapp.reactPackage.listener;

import com.awsatapp.reactPackage.manager.FileDownloadSerialQueue;
import com.awsatapp.reactPackage.model.Pdf;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 19/06/22
 */
public interface OnPdfDownloadStart {
    void onDownloadProgress(FileDownloadSerialQueue fileDownloadSerialQueue);
}
