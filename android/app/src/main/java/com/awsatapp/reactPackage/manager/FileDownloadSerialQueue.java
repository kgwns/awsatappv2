package com.awsatapp.reactPackage.manager;

import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Message;

import androidx.annotation.RequiresApi;

import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloader;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * @Author: Saravanakumar Subramanian
 * @Date: 19/06/22
 */
public class FileDownloadSerialQueue {

    private final BlockingQueue<BaseDownloadTask> mTasks = new LinkedBlockingQueue<>();
    private final HandlerThread mHandlerThread;
    private final Handler mHandler;

    private final static int WHAT_NEXT = 1;
    private final static int ID_INVALID = 0;
    private int mWorkingTaskId = ID_INVALID;

    public BaseDownloadTask mCurrentTask = null;

    public FileDownloadSerialQueue() {
        mHandlerThread = new HandlerThread("SerialDownloadManager");
        mHandlerThread.start();
        mHandler = new Handler(mHandlerThread.getLooper(), new SerialLoop());
        sendNext();
    }

    /**
     * Enqueues the given task sometime in the serial queue. If the {@code task} is in the head of
     * the serial queue, the {@code task} will be started automatically.
     */
    public void enqueue(BaseDownloadTask task) {
        try {
            mTasks.put(task);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    /**
     * Returns the identify of the working task, if there is task is working, you will receive
     * {@link #ID_INVALID}.
     *
     * @return the identify of the working task
     */
    public int getWorkingTaskId() {
        return mWorkingTaskId;
    }

    /**
     * Attempts to stop the working task, halts the processing of waiting tasks, and returns a list
     * of the tasks that were awaiting execution. These tasks are drained (removed) from the task
     * queue upon return from this method.
     */
    public List<BaseDownloadTask> shutdown() {
        if (mWorkingTaskId != ID_INVALID) {
            FileDownloader.getImpl().pause(mWorkingTaskId);
        }

        if(mCurrentTask !=null){
            mCurrentTask = null;
        }

        final List<BaseDownloadTask> unDealTaskList = new ArrayList<>();
        mTasks.drainTo(unDealTaskList);
        mHandlerThread.interrupt();
        mHandlerThread.quit();

        return unDealTaskList;
    }


    private class SerialLoop implements Handler.Callback {

        @Override
        public boolean handleMessage(Message msg) {
            switch (msg.what) {
                case WHAT_NEXT:
                    try {
                        mCurrentTask =  mTasks.take();
                        mWorkingTaskId =
                            mCurrentTask.addFinishListener(new SerialFinishCallback(
                                    new WeakReference<>(FileDownloadSerialQueue.this))).
                                    start();

                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }catch (IllegalStateException e){
                        mCurrentTask.reuse();
                    }
                    break;
            }
            return false;
        }
    }

    private static class SerialFinishCallback implements BaseDownloadTask.FinishListener {
        private final WeakReference<FileDownloadSerialQueue> mQueueWeakReference;

        SerialFinishCallback(WeakReference<FileDownloadSerialQueue> queueWeakReference) {
            this.mQueueWeakReference = queueWeakReference;
        }
        @Override
        public void over(BaseDownloadTask task) {
            task.removeFinishListener(this);

            if (mQueueWeakReference == null) {
                return;
            }

            final FileDownloadSerialQueue queue = mQueueWeakReference.get();
            if (queue == null) {
                return;
            }

            queue.mWorkingTaskId = ID_INVALID;
            queue.sendNext();
        }
    }

    private void sendNext() {
        mHandler.sendEmptyMessage(WHAT_NEXT);
    }

    public BaseDownloadTask getTask()  {
        if(mCurrentTask!=null)
            return mCurrentTask;
        else
            return null;
    }

    public boolean checkIfTaskEnqueued(String taskUrl){
        boolean hasTask = false;
        if(mTasks.size()>0){
            for (BaseDownloadTask task : mTasks) {
                if (task.getUrl().equals(taskUrl)) {
                    hasTask = true;
                }
            }
        }else if(mCurrentTask!=null){
            if (mCurrentTask.getUrl().equals(taskUrl)) {
                hasTask = true;
            }
        }
        return hasTask;
    }

    public BaseDownloadTask getQueuedTask(String taskUrl){
        BaseDownloadTask inQueueTask = null;
        if(mTasks.size()!=0){
            for (BaseDownloadTask task : mTasks) {
                if (task.getUrl().equals(taskUrl)) {
                    inQueueTask = task;
                }
            }
        }else if(mCurrentTask!=null){
            if (mCurrentTask.getUrl().equals(taskUrl)) {
                inQueueTask = mCurrentTask;
            }
        }

        return inQueueTask;
    }

    public void removeCurrentTask(){

        mCurrentTask.cancel();
        mTasks.remove(mCurrentTask);
    }
}