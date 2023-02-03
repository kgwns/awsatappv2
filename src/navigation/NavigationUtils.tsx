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