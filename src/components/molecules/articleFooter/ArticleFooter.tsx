import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { normalize } from '../../../shared/utils/dimensions'
import { moleculesTestID } from '../../../constants'
import { Styles } from '../../../shared/styles'
import { ImagesName } from '../../../shared/styles/images'
import { CaptionWithImage, ImageName } from '../../atoms'
import { Image } from '../../atoms'

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
  bookMarkColorType?: string
}

const ArticleFooter = ({
  leftTitle,
  leftIcon,
  leftTitleColor,
  rightTitle,
  rightIcon,
  rightTitleColor,
  style,
  bookMarkColorType = BookMarkColorType.BLACK
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
    <View style={{ ...articleFooterStyle.container, ...style }}>
      <View style={{ flexDirection: 'row' }}>
        <CaptionWithImage title={leftTitle} icon={leftIcon} color={leftTitleColor} />
        <Text children={'|'} style={articleFooterStyle.verticalDivider} />
        <CaptionWithImage title={rightTitle} icon={rightIcon} color={rightTitleColor} />
      </View>
      <TouchableOpacity testID={moleculesTestID.storySaveBtn} activeOpacity={0.8} onPress={onPressSave}>
        <Image name={storySaveIcon} size={normalize(18)}
        />
      </TouchableOpacity>
    </View>
  )
}

export default ArticleFooter

const articleFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(15)
  },
  verticalDivider: {
    color: Styles.color.silverChalice,
    paddingTop: normalize(2)
  }
})
