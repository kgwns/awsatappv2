import * as React from 'react';

export const navigationReference = React.createRef<any>();

export function navigate(name: string, params?: any) {
    navigationReference.current?.navigate(name, params);
}

export function replace(name: string, params?: any) {
    navigationReference.current?.reset({
        index: 0,
        routes: [{ name, params }]
    })
}

const Deferred = () => {
    let d: any = {};
    d.promise = new Promise(function (resolve, reject) {
        d.resolve = resolve;
        d.reject = reject;
    });
    return d;
};

export const navigationDeferred = Deferred();