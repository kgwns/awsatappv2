package com.awsatapp.reactPackage;
/**
 * Copyright (C) 2015 Mtech.mobi All rights reserved.
 * <p/>
 * Created by Malek Hijazi on 8/20/2015.
 */

import android.content.Context;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;


import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.awsatapp.R;
import com.awsatapp.reactPackage.holder.CoreHolder;
import com.awsatapp.reactPackage.holder.ProgressViewHolder;
import com.awsatapp.reactPackage.listener.ItemClickListener;
import com.awsatapp.reactPackage.listener.ItemLongClickListener;
import com.awsatapp.reactPackage.listener.ItemProgressListener;
import com.awsatapp.reactPackage.listener.OnLoadMoreListener;
import com.awsatapp.reactPackage.listener.OnScrollStateChangedListener;
import com.awsatapp.reactPackage.listener.OnScrolledListener;
import com.awsatapp.reactPackage.model.CoreModel;

import java.util.ArrayList;
import java.util.List;

/**
 * Send the model as a parameter
 */
public abstract class CoreListAdapter<T> extends RecyclerView.Adapter<CoreHolder> {

    public final static int TYPE_NORMAL = 1;
    public final static int TYPE_LOADING = 2;

    private RecyclerView mRecyclerView;
    private Context mContext;
    private ItemClickListener mItemClickListener;
    private ItemLongClickListener mItemLongClickListener;
    private ItemProgressListener itemProgressListener;
    private OnLoadMoreListener mOnLoadMoreListener = null;
    private OnScrolledListener mOnScrolledListener;
    private OnScrollStateChangedListener mOnScrollStateChangedListener;
    private List<T> items;
    private CoreModel<T> model;
    private ProgressBar mFooterLoader;
    private ProgressViewHolder progressViewHolder = null;

    private boolean loading = false;
    protected boolean mInfiniteScroll = false; // to enable laoder as footer
    private int lastItemPosition = 0;
    private int visibleItemCount, totalItemCount;
    private int pastVisiblesItems = 0;
    private boolean hideFooter = false;


    /**
     * The constructor for the CoreListAdapter
     *  @param context      application context
     * @param recyclerView recycler view assosicated with this adapter (for setting up infiniate
     *                     scrolling and scroll state change listeners)
     * @param items        the list of items of type T passed in the class
     * @param itemClickListener
     */
    public CoreListAdapter(Context context, RecyclerView recyclerView, List<T> items, ItemClickListener itemClickListener) {
        this.mContext = context;
        this.mRecyclerView = recyclerView;
        this.items = items;
        this.model = new CoreModel<T>();
        this.mItemClickListener = itemClickListener;
    }

    public CoreListAdapter(Context context, RecyclerView recyclerView, List<T> items,
                           ItemClickListener itemClickListener, ItemProgressListener itemProgressListener) {
        this.mContext = context;
        this.mRecyclerView = recyclerView;
        this.items = items;
        this.model = new CoreModel<T>();
        this.mItemClickListener = itemClickListener;
        this.itemProgressListener = itemProgressListener;
    }

    /**
     * Set the item click listener that gets called when a view holder is clicked
     *
     * @param listener
     */
    public void setItemClickListener(ItemClickListener listener) {
        this.mItemClickListener = listener;
    }

    /**
     * Set the item long click listener that gets called when a view holder is clicked
     *
     * @param listener
     */
    public void setItemLongClickListener(ItemLongClickListener listener) {
        this.mItemLongClickListener = listener;
    }

    /**
     * Set the load more listener that gets called when a the list is almost at the end.
     * Requires to call enableInfiniteScrolling() inside the adapter(the one extending this class)
     * constructor in order to work
     *
     * @param onLoadMoreListener
     */
    public void setOnLoadMoreListener(OnLoadMoreListener onLoadMoreListener) {
        this.mOnLoadMoreListener = onLoadMoreListener;
    }

    public void setOnScrollListener(OnScrolledListener mOnScrolledListener) {
        this.mOnScrolledListener = mOnScrolledListener;
    }

    public void setOnScrollStateChangedListener(OnScrollStateChangedListener mOnScrollStateChangedListener) {
        this.mOnScrollStateChangedListener = mOnScrollStateChangedListener;
    }


    /**
     * Enables infinite scrolling on the adapter.
     * Sets mInfiniteScroll to true which shows the footer loader at the end of the list. Use
     * hideFooterLoader() to hide the footer.
     */
    public void enableInfiniteScrolling() {
        mInfiniteScroll = true;
        setupScrollListener();
    }

    @Override
    public int getItemViewType(int position) {
        if (mInfiniteScroll && position >= getItems().size()) {
            return TYPE_LOADING;
        }
        if (getItems().size() > 0) {
            return TYPE_NORMAL;
        }
        return 0;
    }

    @Override
    public CoreHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (mFooterLoader == null) {
            progressViewHolder = new ProgressViewHolder(inflate(parent, R.layout.library_view_recycler_footer_loader));
            mFooterLoader = progressViewHolder.progressBar;
        }
        if (viewType == TYPE_LOADING) {
            return progressViewHolder;
        } else {
            return onCreateViewHolder(parent);
        }
    }


    @Override
    public void onBindViewHolder(CoreHolder coreHolder, int position) {
        if (getItemViewType(position) == TYPE_LOADING) {
            mFooterLoader = ((ProgressViewHolder) coreHolder).progressBar;
            if (hideFooter) {
                mFooterLoader.setVisibility(View.GONE);
            } else {
                mFooterLoader.setVisibility(View.VISIBLE);
            }
        } else {
            coreHolder.setIsRecyclable(false);
            coreHolder.bindData(getItem(position),position,itemProgressListener);

        }
    }

    @Override
    public int getItemCount() {
        if (getItems().size() == 0) {
            return 0;
        } else if (mInfiniteScroll) {
            return getItems().size() + 1;
        }
        return getItems().size();
    }

    /**
     * @param parent
     * @return returns the view holder for the requested item. This is called after automatically checking
     * if the view type is normal or loader, if its a loader it is automatically handled, the normal
     * view holder is handled using this function.
     */
    public abstract CoreHolder onCreateViewHolder(ViewGroup parent);

    /**
     * @param parent
     * @param layout id
     * @return return the inflated view
     */
    public View inflate(ViewGroup parent, int layout) {
        return LayoutInflater.from(parent.getContext()).inflate(layout, parent, false);

    }

    public ItemClickListener getItemClickListener() {
        return this.mItemClickListener;
    }

    public ItemLongClickListener getItemLongClickListener() {
        return this.mItemLongClickListener;
    }

    public ItemProgressListener getItemProgressListener() {
        return this.itemProgressListener;
    }

    public void setItemProgressListener(ItemProgressListener listener) {
        this.itemProgressListener = listener;
    }

    public List<T> getItems() {
        return this.items;
    }

    /**
     * Return an object of type T at a give position
     *
     * @param position
     * @return T
     */
    public T getItem(int position) {
        return items.get(position);
    }

    /**
     * Resets the adapter; it removes all items.
     */
    public void reset() {
        this.items = new ArrayList<T>();
        notifyDataSetChanged();
    }

    @Deprecated
    public void addItems(T[] items) {

    }

    public void addItems(List<T> objects) {
        int oldLength = getItemCount();
        this.items = model.addItems(this.items, objects);
        setLoaded();
        notifyItemRangeInserted(oldLength, this.items.size());
    }

    public void updateItems(List<T> objects) {
        this.items = objects;
        notifyDataSetChanged();
    }

    public void updateItem(T object, int position) {
        this.items.set(position, object);
        notifyItemChanged(position);
    }

    /**
     * Removes an item from the adapter and notifies the adapter of the removed item position
     *
     * @param index
     */
    public void removeItem(int index) {
        this.items.remove(index);
        if(items.size() == 0){
            notifyDataSetChanged();
        }else{
            notifyItemRemoved(index);
        }
    }



    public void setLoaded() {
        this.loading = false;
    }


    /**
     * @return recyler view instance
     */
    public RecyclerView getRecyclerView() {
        return this.mRecyclerView;
    }

    /**
     * Hide footer progressbar
     */
    public void hideFooterLoader() {
        if (mFooterLoader != null) {
            mFooterLoader.setVisibility(View.GONE);
            hideFooter = true;
        }
    }

    /**
     * Show footer progressbar
     */
    public void showFooterLoader() {
        if (mFooterLoader != null) {
            mFooterLoader.setVisibility(View.VISIBLE);
            hideFooter = false;
        }
    }


    /**
     * This function is now deprecated for public use. Use {@link #enableInfiniteScrolling()} instead.
     */
    @Deprecated
    private void setupScrollListener() {
        if (mRecyclerView.getLayoutManager() instanceof GridLayoutManager) {
            final GridLayoutManager layoutManager = (GridLayoutManager) mRecyclerView
                    .getLayoutManager();

            mRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
                @Override
                public void onScrolled(RecyclerView recyclerView,
                                       int dx, int dy) {
                    super.onScrolled(recyclerView, dx, dy);
                    if (pastVisiblesItems < layoutManager.findFirstVisibleItemPosition()) {
                        if (mOnScrolledListener != null) {
                            mOnScrolledListener.onScroll(1);
                        }
                    } else if (pastVisiblesItems > layoutManager.findFirstVisibleItemPosition()) {
                        if (mOnScrolledListener != null) {
                            mOnScrolledListener.onScroll(-1);
                        }
                    }
                    visibleItemCount = layoutManager.getChildCount();
                    totalItemCount = layoutManager.getItemCount();
                    pastVisiblesItems = layoutManager.findFirstVisibleItemPosition();

                    if (!loading &&
                            (visibleItemCount + pastVisiblesItems) >= totalItemCount - 5) {
                        if (mOnLoadMoreListener != null) {
                            mOnLoadMoreListener.onLoadMore();
                            Log.v("SCROLL", "LOADING MORE");
                            loading = true;
                        }
                    }
                }

                @Override
                public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
                    super.onScrollStateChanged(recyclerView, newState);
                    if (mOnScrollStateChangedListener != null) {
                        mOnScrollStateChangedListener.onScrollStateChanged(newState);
                    }

                }
            });
        } else {

            final LinearLayoutManager layoutManager = (LinearLayoutManager) mRecyclerView
                    .getLayoutManager();
            mRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
                @Override
                public void onScrolled(RecyclerView recyclerView,
                                       int dx, int dy) {
                    super.onScrolled(recyclerView, dx, dy);

                    if (pastVisiblesItems < layoutManager.findFirstVisibleItemPosition()) {
                        if (mOnScrolledListener != null) {
                            mOnScrolledListener.onScroll(1);
                        }
                    } else if (pastVisiblesItems > layoutManager.findFirstVisibleItemPosition()) {
                        if (mOnScrolledListener != null) {
                            mOnScrolledListener.onScroll(-1);
                        }
                    }
                    visibleItemCount = layoutManager.getChildCount();
                    totalItemCount = layoutManager.getItemCount();
                    pastVisiblesItems = layoutManager.findFirstVisibleItemPosition();
                    int position = pastVisiblesItems;
                    if (Math.abs(position - lastItemPosition) > 0) {
                        if (mOnScrolledListener != null) {
                            mOnScrolledListener.onScroll(-1);
                        }
                    }
                    lastItemPosition = position;


                    if (!loading &&
                            (visibleItemCount + pastVisiblesItems) >= totalItemCount - 5) {
                        if (mOnLoadMoreListener != null) {
                            mOnLoadMoreListener.onLoadMore();
                            Log.v("SCROLL", "LOADING MORE");
                            loading = true;
                        }
                    }
                }


                @Override
                public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
                    super.onScrollStateChanged(recyclerView, newState);
                    if (mOnScrollStateChangedListener != null) {
                        mOnScrollStateChangedListener.onScrollStateChanged(newState);
                    }

                }
            });
        }
    }



}
