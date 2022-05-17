package com.awsatapp.reactPackage;

import android.content.Context;
import android.view.ViewGroup;

import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.awsatapp.R;
import com.awsatapp.reactPackage.holder.CoreHolder;
import com.awsatapp.reactPackage.holder.PdfGridHolder;
import com.awsatapp.reactPackage.holder.PdfHolder;
import com.awsatapp.reactPackage.model.Pdf;

import java.util.List;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by malekhijazi on 5/16/17.
 */

public class PdfAdapter extends CoreListAdapter<Pdf> {
    public PdfAdapter(Context context, RecyclerView recyclerView, List<Pdf> items) {
        super(context, recyclerView, items);
    }

    @Override
    public CoreHolder onCreateViewHolder(ViewGroup parent) {
//        if (getRecyclerView().getLayoutManager() instanceof GridLayoutManager) {
//            return new PdfGridHolder(inflate(parent, R.layout.view_pdf_grid), getItemClickListener());
//        }
        return new PdfHolder(inflate(parent, R.layout.view_pdf), getItemClickListener());
    }

}
