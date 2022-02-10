import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize } from 'src/shared/utils/dimensions'
import { moleculesTestID } from 'src/constants'
import { Styles } from 'src/shared/styles'
import { ImagesName } from 'src/shared/styles/images'
import { CaptionWithImage, ImageName, Image } from 'src/components/atoms'

export enum BookMarkColorType {
  WHITE = 'white',
  BLACK = 'black'
}

export interface articleFooterProps {
  leftTitle?: string,
  leftIcon?: ImageName,
  leftTitleColor?: string,
  rightTitle?: string,
  rightIcon?: ImageName,
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
  let storySaveIcon = saveState ? ImagesName.bookmarkActive : ImagesName.blackBdrBookMark

  if (bookMarkColorType == BookMarkColorType.WHITE) {
    storySaveIcon = saveState ? ImagesName.bookMarkActiveWhite : ImagesName.bookMarkWhiteBdr
  }

  const onPressSave = () => {
    setSaveState(!saveState)
  }

  return (
    <View style={StyleSheet.flatten([articleFooterStyle.container, style])} >
      <View>
        <View style={{ flexDirection: 'row' }}>
          <CaptionWithImage title={leftTitle} icon={leftIcon} color={leftTitleColor} />
          <Text children={'|'} style={articleFooterStyle.verticalDivider} />
          <CaptionWithImage title={rightTitle} icon={rightIcon} color={rightTitleColor} />
        </View>
      </View>
      {!hideBookmark &&
        <TouchableOpacity testID={moleculesTestID.storySaveBtn} activeOpacity={0.8} onPress={onPressSave}>
          <Image name={storySaveIcon} size={normalize(18)}
          />
        </TouchableOpacity>
      }
    </View>
  )
}

export default ArticleFooter

const articleFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(10)
  },
  verticalDivider: {
    color: Styles.color.silverChalice,
    paddingTop: normalize(2)
  }
})
