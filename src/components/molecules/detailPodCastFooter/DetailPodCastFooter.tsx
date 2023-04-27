import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { isIOS, isTab, normalize } from '../../../shared/utils/dimensions'
import { moleculesTestID } from '../../../constants/Constants'
import { ImageName, Label } from '../../atoms'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { ImagesName } from 'src/shared/styles'
import { DEFAULT_HIT_SLOP } from 'src/shared/utils'
import { fonts } from 'src/shared/styles/fonts'

export interface DetailPodCastFooterProps {
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
}: DetailPodCastFooterProps) => {
    const activeIconSize = isTab ? ImagesName.favoriteActiveIcon : ImagesName.bookMarkActiveSVG;
    const storySaveIcon =() => {
        return isBookmarked
          ? getSvgImages({
              name: activeIconSize,
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
            <View style={articleFooterStyle.imageContainer}>
                <TouchableOpacity style={articleFooterStyle.imageContainer} testID={moleculesTestID.storySaveBtn} activeOpacity={0.8} onPress={onPress}>
                    {
                        getSvgImages({
                            name: ImagesName.headPhoneIcon,
                            size: 15
                        })
                    }
                    <Label children={leftTitle} color={leftTitleColor} style={articleFooterStyle.leftTitleStyle} />
                </TouchableOpacity>
                <Label style={articleFooterStyle.rightTitleStyle} children={leftTimeLabel} color={leftTimeLabelColor} />
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
        paddingTop: normalize(10)
    },
    leftTitleStyle: {
        fontSize: 13,
        lineHeight: 24,
        fontFamily: fonts.AwsatDigital_Bold,
        paddingRight: normalize(10),
        paddingLeft: normalize(5)
    },
    rightTitleStyle: {
        fontSize: 13,
        lineHeight: 24,
        fontFamily: fonts.Effra_Arbc_Medium,
        paddingTop: isIOS ? 0 : 5
    },
    imageContainer: {
         flexDirection: 'row', 
         alignItems:'center' 
    }
})
