import React from 'react'
import { View, StyleSheet, TouchableOpacity, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { normalize } from 'src/shared/utils/dimensions'
import { moleculesTestID } from 'src/constants/Constants'
import { Styles } from 'src/shared/styles'
import { ImagesName } from 'src/shared/styles/images'
import { CaptionWithImage } from 'src/components/atoms'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { DEFAULT_HIT_SLOP, isNotEmpty } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'

export enum BookMarkColorType {
  WHITE = 'white',
  BLACK = 'black',
  PRIMARY = 'primary',
}

export interface ArticleFooterProps {
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
  rightTitleStyle?: StyleProp<TextStyle>;
  isDetail?: boolean;
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
  favouriteIconWidth = 11,
  favouriteIconHeight = 16,
  rightTitleStyle,
  isDetail = false
}: ArticleFooterProps) => {
  let storySaveIcon=() => {
    const bookmarkActive = bookMarkColorType === BookMarkColorType.PRIMARY ? ImagesName.favoriteActiveIcon : ImagesName.bookMarkActiveSVG;
    return getSvgImages({
          name: isBookmarked ? bookmarkActive : ImagesName.bookMarkSVG,
          width: favouriteIconWidth,
          height: favouriteIconHeight
        })
  }
  
  if(bookMarkColorType === BookMarkColorType.WHITE) {
    storySaveIcon = () => {
      return getSvgImages({
        name: isBookmarked ? ImagesName.bookMarkWhiteActive : ImagesName.bookMarkWhite,
        width: favouriteIconWidth,
        height: favouriteIconHeight
      })
    }
  }

  const { themeData } = useTheme()

  return (
    <View style={StyleSheet.flatten([articleFooterStyle.container, style])} >
      <View style={[articleFooterStyle.authorContainer, rightContainerStyle,hideBookmark && {flex:1}, isDetail && articleFooterStyle.articleDetailUi]}>
        {showFooterTitle && 
        <CaptionWithImage style={articleFooterStyle.leftContainer}
          title={leftTitle} 
          icon={leftIcon} 
          color={leftTitleColor}
          labelStyle={leftTitleStyle}
        />
        }
        {(isNotEmpty(rightTitle) && isNotEmpty(leftTitle)) && showFooterTitle && !isDetail &&
          <View style={articleFooterStyle.verticalDivider} />
        }
        {showFooterTitle && 
        <CaptionWithImage style={articleFooterStyle.rightContainer}
          title={rightTitle} 
          icon={rightIcon}
          color={isDetail ? themeData.primaryBlack : rightTitleColor}
          numberOfLine={2}
          labelStyle={StyleSheet.flatten([rightTitleStyle, isDetail && articleFooterStyle.authorTopMargin])}
          labelContainerStyle={articleFooterStyle.labelContainerStyle}
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
  },
  authorTopMargin: {
    marginTop:5,
    textAlign: 'left',
  },
  articleDetailUi: {
    flexDirection:'column',
    alignItems: 'flex-start'
  },
  labelContainerStyle: {
    maxWidth: '100%' 
  }
  
})
