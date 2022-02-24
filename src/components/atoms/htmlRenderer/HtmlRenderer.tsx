import React from 'react'
import RenderHtml from 'react-native-render-html';
import { screenWidth } from 'src/shared/utils';
import type { MixedStyleRecord } from '@native-html/transient-render-engine';


export type HtmlRendererType = {
    source: any,
    tagsStyles: MixedStyleRecord
}

export const HtmlRenderer = ({ source, tagsStyles }: HtmlRendererType) => {
    return (
        <RenderHtml
            source={{ html: source }}
            contentWidth={screenWidth}
            tagsStyles={tagsStyles}
            ignoredDomTags={['img']}
        />
    )
}