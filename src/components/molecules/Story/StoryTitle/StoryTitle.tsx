import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Label } from 'src/components/atoms/label/Label';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'

interface StoryTitleProps {
    storyTitle: string;
}

const StoryTitle: FunctionComponent<StoryTitleProps> = ({ storyTitle }) => {
    const storyTitleStyle = useThemeAwareObject(customStyle)

    return (
        <>
            <Label children={storyTitle} numberOfLines={2} labelType='caption5' style={storyTitleStyle.labelStyle} />
        </>
    )
}

const customStyle = (theme: CustomThemeType) => {
    const style = StyleSheet.create({
        labelStyle: {
            textAlign: 'center',
            color: theme.primaryDarkSlateGray
        },
    })
    return style
}



export default StoryTitle;
