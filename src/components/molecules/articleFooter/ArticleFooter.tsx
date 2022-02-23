import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize } from 'src/shared/utils/dimensions'
import { moleculesTestID } from 'src/constants'
import { Styles } from 'src/shared/styles'
import { ImagesName } from 'src/shared/styles/images'
import { CaptionWithImage } from 'src/components/atoms'
import { getSvgImages } from 'src/shared/styles/svgImages'

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
  hideBookmark?: boolean
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
  hideBookmark = false
}: articleFooterProps) => {
  const [saveState, setSaveState] = useState(false)
  let storySaveIcon=() => {
    return saveState
      ? getSvgImages({
          name: ImagesName.bookMarkBlackFillSVG,
          size: normalize(18),
        })
      : getSvgImages({
          name: ImagesName.bookMarkBlackBdrSVG,
          size: normalize(18),
        });
  }

  const onPressSave = () => {
    setSaveState(!saveState)
  }

  return (
    <View style={StyleSheet.flatten([articleFooterStyle.container, style])} >
      <View style={[articleFooterStyle.authorContainer,hideBookmark&&{flex:1}]}>
        <CaptionWithImage style={articleFooterStyle.leftContainer} title={leftTitle} icon={leftIcon} color={leftTitleColor}  />
        <View  style={articleFooterStyle.verticalDivider} />
        <CaptionWithImage style={articleFooterStyle.rightContainer} title={rightTitle} icon={rightIcon} color={rightTitleColor} />
      </View>
      {!hideBookmark &&
        <View style={articleFooterStyle.bookMarkContainer}>
          <TouchableOpacity testID={moleculesTestID.storySaveBtn} activeOpacity={0.8} onPress={onPressSave}>
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
    marginLeft: normalize(3)
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
