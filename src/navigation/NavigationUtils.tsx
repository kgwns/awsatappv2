import * as React from 'react';

export const navigationRefernce = React.createRef<any>();

export function navigate(name: string, params?: any) {
    navigationRefernce.current?.navigate(name, params);
}

export function replace(name: string, params?: any) {
    navigationRefernce.current?.reset({
        index: 0,
        routes: [{ name, params }]
    })
}