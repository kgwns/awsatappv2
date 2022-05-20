package com.awsatapp.reactPackage.model;


import java.util.ArrayList;
import java.util.List;

/**
 * Created by Malek Hijazi on 4/22/2016.
 */
public class CoreModel<T> {

    public static <T> T[] addItems(Object[] object1, Object[] object2) {
        Object[] temp = new Object[object1.length + object2.length];
        for (int i = 0; i < object1.length; i++) {
            temp[i] = object1[i];
        }

        for (int i = 0; i < object2.length; i++) {
            temp[(object1.length + i)] = object2[i];
        }
        return (T[]) temp;
    }

    public List<T> addItems(List<T> object1, List<T> object2) {
        List<T> temp = new ArrayList<>();
        for (int i = 0; i < object1.size(); i++) {
            temp.add(object1.get(i));
        }

        for (int i = 0; i < object2.size(); i++) {
            temp.add(object2.get(i));
        }
        return temp;
    }

}
