import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { normalize } from 'src/shared/utils/dimensions'
import { moleculesTestID } from 'src/constants'
import { Styles } from 'src/shared/styles'
import { ImagesName } from 'src/shared/styles/images'
import { CaptionWithImage } from 'src/components/atoms'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { DEFAULT_HIT_SLOP } from 'src/shared/utils'

export enum BookMarkColorType {
  WHITE = 'white',
  BLACK = 'black'
}

export interface articleFooterProps {
  leftTitle?: string,
  leftIcon?: () => void,
  leftTitleColor?: string,
  rightTitle?: string,
  rightIcon?: () => void;
  rightTitleColor?: string,
  style?: object,
  bookMarkColorType?: string,
  hideBookmark?: boolean,
  isBookmarked?: boolean,
  showFooterTitle?: boolean,
  onPress?: () => void;
  leftTitleStyle?: StyleProp<TextStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  favouriteIconWidth?: number;
  favouriteIconHeight?: number;
}

const ArticleFooter = ({
  leftTitle,
  leftIcon,
  leftTitleColor,
  rightTitle,
  rightIcon,
  rightTitleColor,
  style,
  bookMarkColorType = BookMarkColorType.BLACK,
  hideBookmark = false,
  isBookmarked,
  showFooterTitle = true,
  onPress,
  leftTitleStyle,
  rightContainerStyle,
  favouriteIconWidth = 10,
  favouriteIconHeight = 15,
}: articleFooterProps) => {
  let storySaveIcon=() => {
    
    return getSvgImages({
          name: isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookMarkSVG,
          width: favouriteIconWidth,
          height: favouriteIconHeight
        })
  }
  
  if(bookMarkColorType == BookMarkColorType.WHITE) {
    storySaveIcon = () => {
      return getSvgImages({
        name: isBookmarked ? ImagesName.bookMarkWhiteActive : ImagesName.bookMarkWhite,
        width: favouriteIconWidth,
        height: favouriteIconHeight
      })
    }
  }

  return (
    <View style={StyleSheet.flatten([articleFooterStyle.container, style])} >
      <View style={[articleFooterStyle.authorContainer, rightContainerStyle,hideBookmark&&{flex:1}]}>
        {showFooterTitle && 
        <CaptionWithImage style={articleFooterStyle.leftContainer}
          title={leftTitle} 
          icon={leftIcon} 
          color={leftTitleColor}
          labelStyle={leftTitleStyle}
        />
        }
        {(rightTitle || leftTitle) && showFooterTitle && <View style={articleFooterStyle.verticalDivider} />}
        {showFooterTitle && 
        <CaptionWithImage style={articleFooterStyle.rightContainer}
          title={rightTitle} 
          icon={rightIcon}
          color={rightTitleColor}
        />
        }
      </View>
      {!hideBookmark &&
        <View style={articleFooterStyle.bookMarkContainer}>
          <TouchableOpacity
            hitSlop={DEFAULT_HIT_SLOP}
            testID={moleculesTestID.storySaveBtn} activeOpacity={0.8} onPress={onPress}>
            {storySaveIcon()}
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

export default ArticleFooter

const articleFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  authorContainer: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalDivider: {
    height: 10,
    width: 1,
    backgroundColor: Styles.color.silverChalice,
    marginLeft: normalize(5),
    marginRight: normalize(10)
  },
  leftContainer: {
    flexShrink: 1,
    flexBasis: "auto",
  },
  rightContainer: {
    flexGrow: 1,
    flexBasis: "auto",
  },
  bookMarkContainer: {
    flex:0.1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
})
