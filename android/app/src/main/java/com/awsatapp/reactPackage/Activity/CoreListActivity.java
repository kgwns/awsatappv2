/*
 * Copyright (c)
 * Copyright (C) 2017. Codeline Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Malek Hijazi<malek.hijazii@gmail.com>, 2017
 *
 */

package com.awsatapp.reactPackage.Activity;

import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;

import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.awsatapp.R;
import com.awsatapp.reactPackage.CoreListAdapter;
import com.awsatapp.reactPackage.listener.ItemClickListener;
import com.awsatapp.reactPackage.listener.ItemProgressListener;
import com.awsatapp.reactPackage.listener.OnLoadMoreListener;
import com.google.android.material.appbar.AppBarLayout;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import java.util.List;


/**
 * Created by Malek Hijazi on 4/17/2016.
 */
public abstract class CoreListActivity<T> extends CoreActivity implements SwipeRefreshLayout.OnRefreshListener,
        ItemClickListener, OnLoadMoreListener, View.OnClickListener, ItemProgressListener {

    public Toolbar tb;
    public AppBarLayout abl;
    public RecyclerView rvList;
    public ProgressBar pbLoader;
    public SwipeRefreshLayout srl;
    public FloatingActionButton fab;

    public CoreListAdapter<T> adapter;

    public int page = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(getContentView());

        tb = (Toolbar) findViewById(R.id.tb);
        abl = (AppBarLayout) findViewById(R.id.abl);
        rvList = (RecyclerView) findViewById(R.id.rv);
        pbLoader = (ProgressBar) findViewById(R.id.pbLoader);
        srl = (SwipeRefreshLayout) findViewById(R.id.srl);

        setupRefreshLayout();
        setupRecyclerView();

    }

    private void setupRefreshLayout() {
        if(srl != null) {
            srl.setColorSchemeResources(android.R.color.holo_blue_bright,
                    android.R.color.holo_green_dark,
                    android.R.color.holo_orange_light,
                    android.R.color.holo_red_light);
            srl.setOnRefreshListener(this);
        }
    }

    public void setupRecyclerView() {
        rvList.setLayoutManager(initLayoutManager());
        adapter = initAdapter();
        adapter.setItemClickListener(this);
        adapter.setOnLoadMoreListener(this);
        adapter.setItemProgressListener(this);
        rvList.setAdapter(adapter);
        hideLoader();
    }

    public void onItemLoadComplete(List list) {
        if (page == 0) {
            adapter.updateItems(list);
        } else {
            adapter.addItems(list);
        }
        page++;
        srl.setRefreshing(false);
    }

    /**
     * Show back button
     */
    public void setBackButtonEnabled() {
        setBackButtonEnabled(tb);
    }

    /**
     * Set toolbar title
     */
    public void setTitle(String title) {
        setTitle(tb, title);
    }

    /**
     * Set the menu for the toolbar
     */
    public void setOptionsMenu(int menu) {
        setOptionsMenu(tb, menu);
    }

    /**
     * Show the ProgressBar
     */
    public void hideLoader() {
        pbLoader.setVisibility(View.GONE);
    }

    /**
     * Hide the ProgressBar
     */
    public void showLoader() {
        pbLoader.setVisibility(View.VISIBLE);
    }

    /**
     * Define the adapter in here
     */
    public abstract CoreListAdapter<T> initAdapter();

    /**
     * Define the Layout manager in here
     */
    public abstract RecyclerView.LayoutManager initLayoutManager();

    /**
     * Enables/Disables SwipeRefreshLayout
     */
    public void refreshEnabled(boolean enabled) {
        srl.setEnabled(enabled);
    }

    /**
     * Enables/Disables SwipeRefreshLayout
     */
    public void setRefreshing(boolean refreshing) {
        if(srl != null) {
            srl.setRefreshing(refreshing);
        }
    }

    /**
     * Sets default content view R.layout.library_base_activity_list
     */
    public int getContentView() {
        return R.layout.activity_search_results;
    }

    /**
     * Returns the adapter
     */
    public CoreListAdapter<T> getAdapter() {
        return this.adapter;
    }

    public Toolbar getToolbar(){
        return this.tb;
    }
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

    @Override
    public abstract void onProgress(View view, int position,String progress);

}
