import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize } from '../../../shared/utils/dimensions'
import { moleculesTestID } from '../../../constants'
import { ImageName, Label } from '../../atoms'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { ImagesName } from 'src/shared/styles'
import { DEFAULT_HIT_SLOP } from 'src/shared/utils'

export interface detailPodCastFooterProps {
    leftTitle?: string,
    leftIcon?: ImageName,
    leftTitleColor?: string,
    leftTimeLabel?: string,
    leftTimeLabelColor?: string,
    rightIcon?: ImageName,
    rightTitle?: string,
    rightTitleColor?: string,
    rightIconColor?: string,
    isBookmarked: boolean,
    onPressBookmark: () => void,
    onPress: () => void,
}

const DetailPodCastFooter = ({
    leftTitle,
    leftTitleColor,
    leftTimeLabel,
    leftTimeLabelColor,
    isBookmarked,
    onPressBookmark,
    onPress
}: detailPodCastFooterProps) => {
    const storySaveIcon =() => {
        return isBookmarked
          ? getSvgImages({
              name: ImagesName.bookMarkActiveSVG,
              width: 11,
              height: 16
            })
          : getSvgImages({
              name: ImagesName.bookMarkSVG,
              width: 11,
              height: 16
            });
      }

    return (
        <View style={{ ...articleFooterStyle.container }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} testID={moleculesTestID.storySaveBtn} activeOpacity={0.8} onPress={onPress}>
                    {
                        getSvgImages({
                            name: ImagesName.playIconSVG,
                            size: normalize(14)
                        })
                    }
                    <Label children={leftTitle} color={leftTitleColor} style={articleFooterStyle.leftTitleStyle} />
                </TouchableOpacity>
                <Label children={leftTimeLabel} color={leftTimeLabelColor} />
            </View>
            <TouchableOpacity
                hitSlop={DEFAULT_HIT_SLOP}
                testID={moleculesTestID.storySaveBtn} activeOpacity={0.8} onPress={onPressBookmark}>
                {storySaveIcon()}
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
        paddingVertical: normalize(10)
    },
    leftTitleStyle: {
        paddingRight: normalize(10),
        paddingLeft: normalize(20)
    },
    rightTitleStyle: {
        paddingHorizontal: normalize(10),
    }
})
