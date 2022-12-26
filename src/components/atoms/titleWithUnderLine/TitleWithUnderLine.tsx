import { NativeSyntheticEvent, StyleProp, StyleSheet, TextLayoutEventData, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { Styles } from 'src/shared/styles'
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { isNonEmptyArray, isNotEmpty, screenWidth } from 'src/shared/utils'

type TitleWithUnderLineProps = {
    title: string;
    titleContainerStyle?: StyleProp<ViewStyle>;
}

export const TitleWithUnderLine = ({
    title,
    titleContainerStyle,
}: TitleWithUnderLineProps) => {
    const [lineWidth, setLineWidth] = useState(50)

    const style = useThemeAwareObject(customStyle)

    const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        if (isNonEmptyArray(event.nativeEvent.lines)) {
            setLineWidth(event.nativeEvent.lines[0].width + 50)
        }
    }

    if(!isNotEmpty(title)) { 
        return null
    }

    return (
        <View style={StyleSheet.flatten([style.container, titleContainerStyle])}>
            <View>
                <Label children={title} testID='TitleWithUnderLine01' labelType={LabelTypeProp.h1} style={style.title} onTextLayout={onTextLayout} />
                <View style={{ backgroundColor: Styles.color.greenishBlue, width: lineWidth, maxWidth: 0.96 * screenWidth, height: 1 }} />
            </View>
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingVertical: 25,
        paddingBottom: 8,
    },
    title: {
        paddingBottom: 12,
        paddingLeft: 2
    }
})
