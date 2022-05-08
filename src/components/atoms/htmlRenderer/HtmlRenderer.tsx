import React from 'react'
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import type { MixedStyleRecord } from '@native-html/transient-render-engine';
import { fonts } from 'src/shared/styles/fonts';


export type HtmlRendererType = {
    source: any,
    tagsStyles: MixedStyleRecord,
    ignoredDomTags?: any,
}

export const HtmlRenderer = ({ source, tagsStyles, ignoredDomTags }: HtmlRendererType) => {
    const ignoredTags = ignoredDomTags?ignoredDomTags.concat(['img']):['img']
    const { width } = useWindowDimensions();
    const systemFonts = [
        ...defaultSystemFonts,
        fonts.IBMPlexSansArabic_Regular, fonts.Effra_Arbc_Regular
    ] //Need to add what are the fonts we are gonna use

    return (
        <RenderHtml
            source={{ html: source }}
            contentWidth={width}
            tagsStyles={tagsStyles}
            ignoredDomTags={ignoredTags}
            systemFonts={systemFonts}
        />
    )
}