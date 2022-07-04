package com.awsatapp.reactPackage.holder;

import android.content.Context;
import android.view.View;

import androidx.recyclerview.widget.RecyclerView;

import com.awsatapp.reactPackage.listener.ItemClickListener;
import com.awsatapp.reactPackage.listener.ItemLongClickListener;
import com.awsatapp.reactPackage.listener.ItemProgressListener;


/**
 * Created by Malek Hijazi on 4/17/2016.
 */
public abstract class CoreHolder<T> extends RecyclerView.ViewHolder implements View.OnClickListener, View.OnLongClickListener {
    public View rootView;
    private ItemClickListener mItemClickListener;
    private ItemLongClickListener mItemLongClickListener;
    public ItemProgressListener itemProgressListener;
    public Context mContext;
    public CoreHolder(View itemView) {
        this(itemView, null);
    }

    public CoreHolder(View itemView, ItemClickListener listener) {
        this(itemView, listener, null);
    }

    public CoreHolder(View itemView, ItemClickListener itemClickListener, ItemLongClickListener longClickListener) {
        super(itemView);
        this.rootView = itemView;
        this.mContext = rootView.getContext();
        this.mItemClickListener = itemClickListener;
        this.mItemLongClickListener = longClickListener;
        itemView.setOnClickListener(this);
        if (mItemLongClickListener != null) {
            itemView.setOnLongClickListener(this);
        }
    }

    public CoreHolder(View itemView, ItemClickListener itemClickListener,ItemLongClickListener itemLongClickListener,
                      ItemProgressListener itemProgressListener) {
        super(itemView);
        this.rootView = itemView;
        this.mContext = rootView.getContext();
        this.mItemClickListener = itemClickListener;
        this.itemProgressListener = itemProgressListener;
        this.mItemLongClickListener = itemLongClickListener;
        itemView.setOnClickListener(this);
        if (mItemLongClickListener != null) {
            itemView.setOnLongClickListener(this);
        }
    }

    public abstract void bindData(T data,int position,ItemProgressListener itemProgressListener);

    @Override
    public void onClick(View view) {
        if (mItemClickListener != null) {
            mItemClickListener.itemClicked(view, getAdapterPosition());
        }
    }

    @Override
    public boolean onLongClick(View view) {
        if (mItemLongClickListener != null) {
            mItemLongClickListener.itemLongClicked(view, getAdapterPosition());
        }
        return false;
    }

    public ItemClickListener getItemClickListener() {
        return this.mItemClickListener;
    }
}
