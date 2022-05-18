package com.awsatapp.reactPackage.fragment;

import android.os.Bundle;;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.awsatapp.R;
import com.awsatapp.reactPackage.CoreListAdapter;
import com.awsatapp.reactPackage.listener.ItemClickListener;
import com.awsatapp.reactPackage.listener.OnLoadMoreListener;


/**
 * Copyright (C) 2016 Mtech.mobi. All rights reserved.
 * Created by Malek on 12/11/16.
 */

public abstract class CoreListFragment<T> extends CoreFragment implements ItemClickListener,
        OnLoadMoreListener, View.OnClickListener, SwipeRefreshLayout.OnRefreshListener {
    public RecyclerView rvList;
    public ProgressBar pbLoader;
    public SwipeRefreshLayout srl;
    private CoreListAdapter<T> adapter;
    private RecyclerView.LayoutManager mLayoutManager;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mLayoutManager = initLayoutManager();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        ViewGroup view = (ViewGroup) inflater.inflate(getContentView(), container, false);
        this.rvList = (RecyclerView) view.findViewById(getRecyclerViewId());
        this.pbLoader = (ProgressBar) view.findViewById(R.id.pbLoader);
        this.srl = (SwipeRefreshLayout) view.findViewById(getSwipeRefreshLayoutId());

        try {
            this.setupRecyclerView();
        } catch (Exception e) {
            e.printStackTrace();
        }
        this.setupRefreshLayout();
        return view;
    }

    private void setupRefreshLayout() {
        if (srl != null) {
            srl.setColorSchemeResources(R.color.colorAccent);
            srl.setOnRefreshListener(this);
        }
    }

    public void setupRecyclerView() throws Exception {
        rvList.setLayoutManager(mLayoutManager);
        adapter = initAdapter();
        if(adapter == null){
            throw new Exception("Init adapter must be different than null");
        }
        adapter.setItemClickListener(this);
        adapter.setOnLoadMoreListener(this);
        rvList.setAdapter(adapter);
        hideLoader();
    }

    public CoreListAdapter<T> getAdapter() {
        return this.adapter;
    }

    /**
     * Enables/Disables SwipeRefreshLayout
     */
    public void refreshEnabled(boolean enabled) {
        srl.setEnabled(enabled);
    }

    /**
     * hide/show SwipeRefreshLayout loader
     */
    public void setRefreshing(boolean refreshing) {
        if(srl != null) {
            srl.setRefreshing(refreshing);
        }
    }

    /**
     * Hide/Show progress bar loader
     */
    public void hideLoader() {
        if (pbLoader != null) {
            pbLoader.setVisibility(View.GONE);
        }
    }

    public void showLoader() {
        if (pbLoader != null) {
            pbLoader.setVisibility(View.VISIBLE);
        }
    }


    /**
     * Define the adapter in here
     */
    public abstract CoreListAdapter<T> initAdapter();

    /**
     * Define the layout manager in here
     */
    public abstract RecyclerView.LayoutManager initLayoutManager();

    /**
     * Return the content view of the fragment
     **/
    public abstract int getContentView();

    /**
     * Return the id of the RV
     **/
    public abstract int getRecyclerViewId();

    /**
     * Return the id of the Swipe Refresh Layout
     **/
    public abstract int getSwipeRefreshLayoutId();

    /**
     * Ovverride this method to change what swipe to refresh does
     */
    @Override
    public abstract void onRefresh();

    @Override
    public abstract void itemClicked(View view, int integer);

    @Override
    public abstract void onLoadMore();

    @Override
    public abstract void onClick(View view);
}
