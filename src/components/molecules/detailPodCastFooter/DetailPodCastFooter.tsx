import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize } from '../../../shared/utils/dimensions'
import { moleculesTestID } from '../../../constants'
import { ImageName, Label } from '../../atoms'
import HeadPhoneIcon from 'src/assets/images/icons/headPhoneIcon.svg';
import LeftArrow from 'src/assets/images/icons/left_arrow.svg';

export interface detailPodCastFooterProps {
    leftTitle?: string,
    leftIcon?: ImageName,
    leftTitleColor?: string,
    leftIconColor?: string,
    leftTimeLabel?: string,
    leftTimeLabelColor?: string,
    rightIcon?: ImageName,
    rightTitle?: string,
    rightTitleColor?: string,
    rightIconColor?: string,
}

const DetailPodCastFooter = ({
    leftTitle,
    leftTitleColor,
    rightTitle,
    rightTitleColor,
    leftTimeLabel,
    leftTimeLabelColor,
    rightIconColor,
    leftIconColor

}: detailPodCastFooterProps) => {

    return (
        <View style={{ ...articleFooterStyle.container }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} testID={moleculesTestID.storySaveBtn} activeOpacity={0.8} onPress={() => { console.log('play podcasts') }}>
                    <HeadPhoneIcon color={leftIconColor} />
                    <Label children={leftTitle} color={leftTitleColor} style={articleFooterStyle.leftTitleStyle} />
                </TouchableOpacity>
                <Label children={leftTimeLabel} color={leftTimeLabelColor} />
            </View>


            <TouchableOpacity style={{ flexDirection: 'row' }} testID={moleculesTestID.storySaveBtn} activeOpacity={0.8} onPress={() => { console.log('more episodes') }}>
                <Label children={rightTitle} color={rightTitleColor} style={articleFooterStyle.rightTitleStyle} />
                <LeftArrow color={rightIconColor} />
            </TouchableOpacity>
        </View>
    )
}

export default DetailPodCastFooter

const articleFooterStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(10),
    },
    leftTitleStyle: {
        paddingRight: normalize(10),
        paddingLeft: normalize(20)
    },
    rightTitleStyle: {
        paddingHorizontal: normalize(10),
    }
})
