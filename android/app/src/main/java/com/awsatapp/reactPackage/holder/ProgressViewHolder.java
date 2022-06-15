package com.awsatapp.reactPackage.holder;

import android.view.View;
import android.widget.ProgressBar;

import com.awsatapp.R;
import com.awsatapp.reactPackage.listener.ItemProgressListener;


/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by Malek on 3/15/17.
 */
public class ProgressViewHolder extends CoreHolder {
    public ProgressBar progressBar;

    public ProgressViewHolder(View v) {
        super(v);
        progressBar = (ProgressBar) v.findViewById(R.id.progressBar);
    }

    @Override
    public void bindData(Object data, int position, ItemProgressListener itemProgressListener) {

    }
}
