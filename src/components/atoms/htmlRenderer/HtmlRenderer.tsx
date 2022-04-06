import React from 'react'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import type { MixedStyleRecord } from '@native-html/transient-render-engine';


export type HtmlRendererType = {
    source: any,
    tagsStyles: MixedStyleRecord,
    ignoredDomTags?: any,
}

export const HtmlRenderer = ({ source, tagsStyles, ignoredDomTags }: HtmlRendererType) => {
    const ignoredTags = ignoredDomTags?ignoredDomTags.concat(['img']):['img']
    const { width } = useWindowDimensions();
    return (
        <RenderHtml
            source={{ html: source }}
            contentWidth={width}
            tagsStyles={tagsStyles}
            ignoredDomTags={ignoredTags}
        />
    )
}