import React from 'react'
import RenderHtml from 'react-native-render-html';
import { screenWidth } from 'src/shared/utils';
import type { MixedStyleRecord } from '@native-html/transient-render-engine';


export type HtmlRendererType = {
    source: any,
    tagsStyles: MixedStyleRecord,
    ignoredDomTags?: any,
}

export const HtmlRenderer = ({ source, tagsStyles, ignoredDomTags }: HtmlRendererType) => {
    const ignoredTags = ignoredDomTags?ignoredDomTags.concat(['img']):['img']
    return (
        <RenderHtml
            source={{ html: source }}
            contentWidth={screenWidth}
            tagsStyles={tagsStyles}
            ignoredDomTags={ignoredTags}
        />
    )
}