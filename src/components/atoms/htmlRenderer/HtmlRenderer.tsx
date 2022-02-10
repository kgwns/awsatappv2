import { View } from 'react-native'
import React from 'react'
import RenderHtml from 'react-native-render-html';
import { screenWidth } from 'src/shared/utils';

export const HtmlRenderer = ({ source }: { source: any }) => {
    return (
        <View>
            <RenderHtml
                source={{ html: source }}
                contentWidth={screenWidth}
            />
        </View>
    )
}