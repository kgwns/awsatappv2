import React, { FunctionComponent } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Label } from 'src/components/atoms/label/Label';
import { colors } from '../../../../shared/styles/colors';
import { normalize } from '../../../../shared/utils';

interface StoryHeaderProps {
    headerTitle: string;
}

const StoryHeader: FunctionComponent<StoryHeaderProps> = ({ headerTitle }) => {
    return (
        <View style={StoryHeaderStyle.headerContainer}>
            <Label style={StoryHeaderStyle.title} children={headerTitle} labelType='caption9' color={colors.greenishBlue} />
        </View>
    )
}

const StoryHeaderStyle = StyleSheet.create({
    headerContainer: {
        justifyContent: 'flex-end',
        marginTop: normalize(10)
    },
    title: {
        marginLeft: '5%'
    }
})

export default StoryHeader;
