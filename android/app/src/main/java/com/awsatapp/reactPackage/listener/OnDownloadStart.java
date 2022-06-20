package com.awsatapp.reactPackage.listener;

import com.awsatapp.reactPackage.model.Pdf;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 17/06/22
 */
public interface OnDownloadStart {
    void onDownloadProgress(Pdf pdf);
}
