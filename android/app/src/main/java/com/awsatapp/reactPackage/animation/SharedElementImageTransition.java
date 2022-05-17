package com.awsatapp.reactPackage.animation;

import android.os.Build;
import android.transition.ChangeBounds;
import android.transition.ChangeImageTransform;
import android.transition.ChangeTransform;
import android.transition.TransitionSet;

import androidx.annotation.RequiresApi;

/**
 * Copyright (C) 2017 Mtech.mobi. All rights reserved.
 * Created by Malek on 2/3/17.
 */


@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class SharedElementImageTransition extends TransitionSet {
    public SharedElementImageTransition() {
        setOrdering(ORDERING_TOGETHER);
        addTransition(new ChangeBounds()).
                addTransition(new ChangeTransform()).
                addTransition(new ChangeImageTransform());
    }
}