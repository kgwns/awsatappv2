import React from 'react';
import { StyleSheet } from 'react-native';
import { Label } from '../../../atoms';
import { colors } from '../../../../shared/styles/colors';

const StoryTitle = ({ storyTitle }: any) => {
    return (
        <>
            <Label children={storyTitle} numberOfLines={2} labelType='caption5' style={StoryTitleStyle.labelStyle} color={colors.darkSlateGray} />
        </>
    )
}

const StoryTitleStyle = StyleSheet.create({
    labelStyle: {
        textAlign: 'center'
    },
})


export default StoryTitle;