import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Label } from '../../../atoms';
import { colors } from '../../../../shared/styles/colors';

const StoryHeader = ({ headerTitle }: any) => {
    return (
        <View style={StoryHeaderStyle.headerContainer}>
            <Label children={headerTitle} labelType='caption9' color={colors.greenishBlue} />
        </View>
    )
}

const StoryHeaderStyle = StyleSheet.create({
    headerContainer: {
        justifyContent: 'flex-end',
        marginLeft: 15,
        marginTop: 10
    },
})

export default StoryHeader;